import puppeteer, { type PDFOptions } from "puppeteer";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";

export const generateCSV = async (
  data: Array<Record<string, any>>,
  csvFields?: string[]
): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    try {
      let json2csvParser;
      if (csvFields) {
        json2csvParser = new Parser({
          fields: csvFields,
          // encoding: "utf-8",
          withBOM: true,
        });
      } else {
        json2csvParser = new Parser({ withBOM: true }); // encoding: "utf-8",
      }
      const csvData = json2csvParser.parse(data);
      const result = Buffer.from(csvData).toString("base64");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const generatePDF = async (
  htmlData: string,
  options?: PDFOptions
): Promise<string> => {
  return await new Promise<string>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(htmlData);
      const buffer = await page.pdf({
        format: options?.format ?? "A2",
        ...options,
      });
      const base64String1 = Buffer.from(buffer).toString("base64");
      resolve(base64String1);
    } catch (error) {
      console.log(error, "error");
      reject(error);
    }
  });
};

export const generateStickerPDF = async (htmlData: string): Promise<any> => {
  return await new Promise<any>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const filepath = path.join(__dirname, "sticker.pdf");
      const page = await browser.newPage();
      await page.setContent(htmlData);
      const buffer = await page.pdf({ format: "A4", pageRanges: "-1" });
      await browser.close();
      fs.writeFile(filepath, buffer, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(filepath);
        }
      });
      resolve(fs.createReadStream(path.join(__dirname, "sticker.pdf")));
    } catch (error) {
      console.log(error, "error");
      reject(error);
    }
  });
};
