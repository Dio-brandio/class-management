export const forgetPasswordContent = (
  userData: any,
  verificationLink: string,
  expiresIn: Date,
  logoKey: string
) => {
  const emailSubject = "Reset Your Account Password";
  const emailHtml = forgotPasswordHTML(
    userData,
    verificationLink,
    expiresIn,
    logoKey
  );
  return {
    subject: emailSubject,
    html: emailHtml,
  };
};

function forgotPasswordHTML(
  userData: any,
  verificationLink: string,
  expiresIn: Date,
  logoKey: string
) {
  return `<!doctype html>
 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
   xmlns:o="urn:schemas-microsoft-com:office:office">
 
 <head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>${process.env.COMPANY_NAMME_EN}</title>
 
   <style type="text/css">
     @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
 
     body {
       font-family: 'Open Sans', sans-serif !important;
     }
 
     p {
       margin: 10px 0;
       padding: 0;
     }
 
     table {
       border-collapse: collapse;
     }
 
     h1,
     h2,
     h3,
     h4,
     h5,
     h6 {
       display: block;
       margin: 0;
       padding: 0;
     }
 
     img,
     a img {
       border: 0;
       height: auto;
       outline: none;
       text-decoration: none;
     }
 
     body,
     #bodyTable,
     #bodyCell {
       height: 100%;
       margin: 0;
       padding: 0;
       width: 100%;
     }
 
     .mcnPreviewText {
       display: none !important;
     }
 
     #outlook a {
       padding: 0;
     }
 
     img {
       -ms-interpolation-mode: bicubic;
     }
 
     table {
       mso-table-lspace: 0pt;
       mso-table-rspace: 0pt;
     }
 
     .ReadMsgBody {
       width: 100%;
     }
 
     .ExternalClass {
       width: 100%;
     }
 
     p,
     a,
     li,
     td,
     blockquote {
       mso-line-height-rule: exactly;
     }
 
     a[href^=tel],
     a[href^=sms] {
       color: #F39335;
       cursor: default;
       text-decoration: none;
     }
 
     p,
     a,
     li,
     td,
     body,
     table,
     blockquote {
       -ms-text-size-adjust: 100%;
       -webkit-text-size-adjust: 100%;
     }
 
     .ExternalClass,
     .ExternalClass p,
     .ExternalClass td,
     .ExternalClass div,
     .ExternalClass span,
     .ExternalClass font {
       line-height: 100%;
     }
 
     a[x-apple-data-detectors] {
       color: inherit !important;
       text-decoration: none !important;
       font-size: inherit !important;
       font-family: inherit !important;
       font-weight: inherit !important;
       line-height: inherit !important;
     }
 
     #bodyCell {
       padding: 10px;
     }
 
     .templateContainer {
       max-width: 600px !important;
     }
 
     a.mcnButton {
       display: block;
       text-decoration: none;
     }
 
     .mcnImage,
     .mcnRetinaImage {
       vertical-align: bottom;
     }
 
     .mcnTextContent {
       word-break: break-word;
     }
 
     .mcnTextContent img {
       height: auto !important;
     }
 
     .mcnDividerBlock {
       table-layout: fixed !important;
     }
 
 
     body,
     #bodyTable {
       background-color: #BBC1C4;
     }
 
 
     #bodyCell {
       border-top: 0;
     }
 
 
     .templateContainer {
       border: 0;
     }
 
     h1 {
       color: #202020;
       font-family: 'Open Sans', sans-serif;
       font-size: 26px;
       font-style: normal;
       font-weight: bold;
       line-height: 125%;
       letter-spacing: normal;
       text-align: left;
     }
 
     h2 {
       color: #202020;
       font-family: 'Open Sans', sans-serif;
       font-size: 22px;
       font-style: normal;
       font-weight: bold;
       line-height: 125%;
       letter-spacing: normal;
       text-align: left;
     }
 
     h3 {
       color: #202020;
       font-family: 'Open Sans', sans-serif;
       font-size: 32px;
       font-style: normal;
       font-weight: bold;
       line-height: 125%;
       letter-spacing: normal;
       text-align: left;
     }
 
     h4 {
       color: #202020;
       font-family: 'Open Sans', sans-serif;
       font-size: 24px;
       font-style: normal;
       font-weight: bold;
       line-height: 125%;
       letter-spacing: normal;
       text-align: left;
     }
 
     #templatePreheader {
       background-color: #F1F4F5;
       background-image: none;
       background-repeat: no-repeat;
       background-position: center;
       background-size: cover;
       border-top: 0;
       border-bottom: 0;
       padding-top: 9px;
       padding-bottom: 9px;
     }
 
     #templatePreheader .mcnTextContent,
     #templatePreheader .mcnTextContent p {
       color: #656565;
       font-family: 'Open Sans', sans-serif;
       font-size: 12px;
       line-height: 150%;
       text-align: left;
     }
 
     #templatePreheader .mcnTextContent a,
     #templatePreheader .mcnTextContent p a {
       color: #656565;
       font-weight: normal;
       text-decoration: underline;
     }
 
     #templateHeader {
       background-color: #F1F4F5;
       background-image: none;
       background-repeat: no-repeat;
       background-position: center;
       background-size: cover;
       border-top: 0;
       border-bottom: 0;
       padding-top: 5px;
       padding-bottom: 0px;
     }
 
     #templateHeader .mcnTextContent,
     #templateHeader .mcnTextContent p {
       color: #202020;
       font-family: 'Open Sans', sans-serif;
       font-size: 16px;
       line-height: 150%;
       text-align: left;
     }
 
     #templateHeader .mcnTextContent a,
     #templateHeader .mcnTextContent p a {
       color: #007C89;
       font-weight: normal;
       text-decoration: underline;
     }
 
     #templateBody {
       background-color: #ffffff;
       background-image: none;
       background-repeat: no-repeat;
       background-position: center;
       background-size: cover;
       border-top: 0;
       border-bottom: 2px solid #EAEAEA;
       padding-top: 20px;
       padding-bottom: 20px;
       padding: 20px;
       background: #F1F4F5;
       ;
     }
 
     #templateBody .mcnTextContent,
     #templateBody .mcnTextContent p {
       color: #202020;
       font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
       font-size: 18px;
       line-height: 150%;
       text-align: left;
     }
 
     #templateBody .mcnTextContent a,
     #templateBody .mcnTextContent p a {
       color: #007C89;
       font-weight: normal;
       text-decoration: underline;
     }
 
     #templateFooter {
       background-color: #03314B;
       background-image: none;
       background-repeat: no-repeat;
       background-position: center;
       background-size: cover;
       border-top: 0;
       border-bottom: 0;
       padding-bottom: 0px;
     }
 
     #templateFooter .mcnTextContent,
     #templateFooter .mcnTextContent p {
       color: #ffffff;
       font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
       font-size: 14px;
       line-height: 150%;
       text-align: center;
     }
 
     #templateFooter .mcnTextContent a,
     #templateFooter .mcnTextContent p a {
       color: #656565;
       font-weight: normal;
       text-decoration: underline;
     }
 
     @media only screen and (min-width:768px) {
       .templateContainer {
         width: 600px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       body,
       table,
       td,
       p,
       a,
       li,
       blockquote {
         -webkit-text-size-adjust: none !important;
       }
 
 
     }
 
 
     @media only screen and (max-width: 480px) {
       body {
         width: 100% !important;
         min-width: 100% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnRetinaImage {
         max-width: 100% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnImage {
         width: 100% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnCartContainer,
       .mcnCaptionTopContent,
       .mcnRecContentContainer,
       .mcnCaptionBottomContent,
       .mcnTextContentContainer,
       .mcnBoxedTextContentContainer,
       .mcnImageGroupContentContainer,
       .mcnCaptionLeftTextContentContainer,
       .mcnCaptionRightTextContentContainer,
       .mcnCaptionLeftImageContentContainer,
       .mcnCaptionRightImageContentContainer,
       .mcnImageCardLeftTextContentContainer,
       .mcnImageCardRightTextContentContainer,
       .mcnImageCardLeftImageContentContainer,
       .mcnImageCardRightImageContentContainer {
         max-width: 100% !important;
         width: 100% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnBoxedTextContentContainer {
         min-width: 100% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnImageGroupContent {
         padding: 9px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnCaptionLeftContentOuter .mcnTextContent,
       .mcnCaptionRightContentOuter .mcnTextContent {
         padding-top: 9px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnImageCardTopImageContent,
       .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,
       .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
         padding-top: 18px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnImageCardBottomImageContent {
         padding-bottom: 9px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnImageGroupBlockInner {
         padding-top: 0 !important;
         padding-bottom: 0 !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcnImageGroupBlockOuter {
         padding-top: 9px !important;
         padding-bottom: 9px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnTextContent,
       .mcnBoxedTextContentColumn {
         padding-right: 18px !important;
         padding-left: 18px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnImageCardLeftImageContent,
       .mcnImageCardRightImageContent {
         padding-right: 18px !important;
         padding-bottom: 0 !important;
         padding-left: 18px !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       .mcpreview-image-uploader {
         display: none !important;
         width: 100% !important;
       }
 
     }
 
 
 
     @media only screen and (max-width: 480px) {
       h3 {
         font-size: 16px !important;
         line-height: 125% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       h4 {
         font-size: 14px !important;
         line-height: 150% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       .mcnBoxedTextContentContainer .mcnTextContent,
       .mcnBoxedTextContentContainer .mcnTextContent p {
         font-size: 14px !important;
         line-height: 150% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
       #templatePreheader {
         display: block !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       #templatePreheader .mcnTextContent,
       #templatePreheader .mcnTextContent p {
         font-size: 14px !important;
         line-height: 150% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       #templateHeader .mcnTextContent,
       #templateHeader .mcnTextContent p {
         font-size: 16px !important;
         line-height: 150% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       #templateBody .mcnTextContent,
       #templateBody .mcnTextContent p {
         font-size: 14px !important;
         line-height: 150% !important;
       }
 
     }
 
     @media only screen and (max-width: 480px) {
 
       #templateFooter .mcnTextContent,
       #templateFooter .mcnTextContent p {
         font-size: 14px !important;
         line-height: 150% !important;
       }
 
     }
   </style>
 </head>
 
 <body>
   <span class="mcnPreviewText"
     style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span>
 
   <center>
     <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
       <tr>
         <td align="center" valign="top" id="bodyCell">
           <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
             <tr>
               <td valign="top" id="templatePreheader"></td>
             </tr>
             <tr>
               <td valign="top" id="templateHeader">
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock"
                   style="min-width:100%;">
                   <tbody class="mcnImageBlockOuter">
                     <tr>
                       <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                         <table align="left" width="100%" border="0" cellpadding="0"
                           cellspacing="0" class="mcnImageContentContainer"
                           style="min-width:100%;">
                           <tbody>
                             <tr>
                               <td class="mcnImageContent" valign="top"
                                 style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
 
 
                                 <img align="center" alt=""
                                   src="${process.env.URLS_S3BASEURL}${logoKey}"
                                   width="150px"
                                   style="max-width: 150px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border-radius: 20%;"
                                   class="mcnImage">
 
 
                               </td>
                             </tr>
                           </tbody>
                         </table>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </td>
             </tr>
             <tr>
               <td valign="top" id="templateBody">
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                   style="min-width:100%;background-color: #fff;">
                   <tbody class="mcnTextBlockOuter">
                     <tr>
                       <td valign="top" class="mcnTextBlockInner" style="padding:20px;">
                         <table align="left" border="0" cellpadding="0" cellspacing="0"
                           style="max-width:100%; min-width:100%;" width="100%"
                           class="mcnButtonContentContainer">
                           <tbody>
                             <tr>
 
                               <td valign="top" class="mcnButtonContent"
                                 style="padding:0px">
 
                                 <h3
                                   style="text-align: center;font-family:open sans,helvetica neue,helvetica,arial,sans-serif">
                                   <strong>Welcome ${
                                     userData.name ?? userData.contactName
                                   }</strong>
                                 </h3>
                                 &nbsp;
 
                                 <h4
                                   style="text-align: center; font-family:open sans,helvetica neue,helvetica,arial,sans-serif;color:#1A2275">
                                   <span style="color:#03314B"><strong>Reset Your
                                       Password</strong></span>
                                 </h4>
                                 &nbsp;
 
                                 <p style="text-align: left;"><span
                                     style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif;line-height: 30px;"><span>Hello,<br>
                                       We have sent you this email in response to
                                       your request to rest your password of your
                                       login.<br /><br />
                                       <span style="color:#9D9D9D;">To reset your
                                         password, please follow the link
                                         below.</span><br>
 
                                     </span>
                                 </p>
 
 
 
 
                               </td>
                             </tr>
                           </tbody>
                         </table>
                         <table border="0" cellpadding="0" cellspacing="0"
                           class="mcnButtonContentContainer"
                           style="border-collapse: separate !important;border-radius: 4px;background-color: #03314B;">
                           <tbody>
                             <tr>
                               <td align="center" valign="middle" class="mcnButtonContent"
                                 style="font-family: Arial; font-size: 16px; padding: 18px;">
                                 <a class="mcnButton " title="Reset Password"  href="${verificationLink}"
                                   style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;" rel="noreferrer noopener" target="_blank">Reset
                                   Password</a>
                               </td>
                             </tr>
                           </tbody>
                         </table>
 
                         <table border="0" cellpadding="0" cellspacing="0"
                           class="mcnButtonContentContainer"
                           style="border-collapse: separate !important;border-radius: 4px;background-color: #fff;">
                           <tbody>
                             <tr>
                               <td align="center" valign="middle" class="mcnButtonContent"
                                 style="font-family: Arial; font-size: 16px; padding-top:0; padding-right:5px; padding-bottom:9px; padding-left:5px;">
                                 <p
                                   style="margin-bottom:0px;text-align: left;color: #F85D5D;font-family:open sans,helvetica neue,helvetica,arial,sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 24px; ">
                                   *This link will be expired in ${
                                     new Date(expiresIn)
                                       .toLocaleString()
                                       .slice(10) ??
                                     process.env.JWT_RESETPASSWORDLINKEXP
                                   }.
                                 </p>
                                 <p
                                   style="margin-top:0px;margin-bottom:30px;text-align: left;color: #F85D5D;font-family:open sans,helvetica neue,helvetica,arial,sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 24px; ">
                                   please ignore this email if you did not request a
                                   password change.
                                 </p>
                                 <p style="text-align: left;"><span
                                     style="color:#4A4A4A"><span><span
                                         style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif">Thanks,<br>
                                         <span style="color:#03314B;">${
                                           process.env.COMPANY_NAMME_EN
                                         }</span></span></span></span></p>
                               </td>
                             </tr>
                           </tbody>
                         </table>
                       </td>
                     </tr>
                   </tbody>
                 </table>
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
                   style="min-width:100%;">
                   <tbody class="mcnDividerBlockOuter">
                     <tr>
                       <td class="mcnDividerBlockInner"
                         style="min-width: 100%; padding: 10px 18px 10px;">
                         <table class="mcnDividerContent" border="0" cellpadding="0"
                           cellspacing="0" width="100%" style="min-width:100%;">
                           <tbody>
                             <tr>
                               <td>
                                 <span></span>
                               </td>
                             </tr>
                           </tbody>
                         </table>
                       </td>
                     </tr>
                   </tbody>
                 </table>
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                   style="min-width:100%;background-color: #fff;">
                   <tbody class="mcnTextBlockOuter">
                     <tr>
                       <td valign="top" class="mcnTextBlockInner"
                         style="padding:20px 20px 0px 20px;">
                         <table align="left" border="0" cellpadding="0" cellspacing="0"
                           style="max-width:100%; min-width:100%;" width="100%"
                           class="mcnTextContentContainer">
                           <tbody>
                             <tr>
 
                               <td valign="top" class="mcnTextContent"
                                 style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
 
 
 
                                 <h4
                                   style="text-align: center; font-family:open sans,helvetica neue,helvetica,arial,sans-serif;color:#1A2275">
                                   <span style="color:#03314B"><strong>Get the ${
                                     process.env.COMPANY_NAMME_EN
                                   }</strong></span>
                                 </h4>
 
                                 <p style="text-align: center;"><span
                                     style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif"><span>
                                       Get the most of ${
                                         process.env.COMPANY_NAMME_EN
                                       } by installing the
                                       mobile app.
                                       You can login by using your phone number.
                                     </span>
                                 </p>
 
 
 
                               </td>
                             </tr>
                           </tbody>
                         </table>
                       </td>
                     </tr>
                   </tbody>
                 </table>
                 <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%"
                   class="mcnTextBlock" style="min-width:100%;background-color: #fff; ">
                   <tbody class="mcnTextBlockOuter">
                     <tr>
                       <td valign="top">
                         <table border="0" cellpadding="0" cellspacing="0" width="100%"
                           class="mcnFollowBlock" style="min-width:100%;">
                           <tbody class="mcnFollowBlockOuter">
                             <tr>
                               <td align="center" valign="top" style="padding:9px"
                                 class="mcnFollowBlockInner">
                                 <table border="0" cellpadding="0" cellspacing="0"
                                   width="100%" class="mcnFollowContentContainer"
                                   style="min-width:100%;">
                                   <tbody>
                                     <tr>
                                       <td align="center">
                                         <table border="0" cellpadding="0"
                                           cellspacing="0" width="100%"
                                           style="min-width:100%;"
                                           class="mcnFollowContent">
                                           <tbody>
                                             <tr>
                                               <td align="center"
                                                 valign="top">
                                                 <table align="center"
                                                   border="0"
                                                   cellpadding="0"
                                                   cellspacing="0">
                                                   <tbody>
                                                     <tr>
                                                       <td align="center"
                                                         valign="top">
 
 
 
                                                         <table
                                                           align="center"
                                                           border="0"
                                                           cellpadding="0"
                                                           cellspacing="0"
                                                           style="display:inline;">
                                                           <tbody>
                                                             <tr>
                                                               <td valign="top"
                                                                 style="padding-right:0px; padding-bottom:9px;"
                                                                 class="mcnFollowContentItemContainer">
                                                                 <table
                                                                   border="0"
                                                                   cellpadding="0"
                                                                   cellspacing="0"
                                                                   width="100%"
                                                                   class="mcnFollowContentItem">
                                                                   <tbody>
                                                                     <tr>
                                                                       <td align="center"
                                                                         valign="middle"
                                                                         style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                         <table
                                                                           align="center"
                                                                           border="0"
                                                                           cellpadding="0"
                                                                           cellspacing="0"
                                                                           width="">
                                                                           <tbody>
                                                                             <tr>
 
                                                                               <td align="center"
                                                                                 valign="middle"
                                                                                 width="24"
                                                                                 class="mcnFollowIconContent">
                                                                                 <a href="#"
                                                                                   style="text-align:center"
                                                                                   target="_blank"><img
                                                                                     style="width:150px"
                                                                                     src="https://mcusercontent.com/e7bacf72d89f5a3b97e22e97d/images/561ce577-1d65-6aba-ab7a-f6ae51bb789c.png" /></a>
                                                                               </td>
 
 
                                                                             </tr>
                                                                           </tbody>
                                                                         </table>
                                                                       </td>
                                                                     </tr>
                                                                   </tbody>
                                                                 </table>
                                                               </td>
                                                             </tr>
                                                           </tbody>
                                                         </table>
                                                         <table
                                                           align="center"
                                                           border="0"
                                                           cellpadding="0"
                                                           cellspacing="0"
                                                           style="display:inline;">
                                                           <tbody>
                                                             <tr>
                                                               <td valign="top"
                                                                 style="padding-right:0; padding-bottom:9px;"
                                                                 class="mcnFollowContentItemContainer">
                                                                 <table
                                                                   border="0"
                                                                   cellpadding="0"
                                                                   cellspacing="0"
                                                                   width="100%"
                                                                   class="mcnFollowContentItem">
                                                                   <tbody>
                                                                     <tr>
                                                                       <td align="center"
                                                                         valign="middle"
                                                                         style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                         <table
                                                                           align="center"
                                                                           border="0"
                                                                           cellpadding="0"
                                                                           cellspacing="0"
                                                                           width="">
                                                                           <tbody>
                                                                             <tr>
 
                                                                               <td align="center"
                                                                                 valign="middle"
                                                                                 width="24"
                                                                                 class="mcnFollowIconContent">
                                                                                 <a href="#"
                                                                                   target="_blank"
                                                                                   style="text-align: center;"><img
                                                                                     style="width:150px"
                                                                                     src="https://mcusercontent.com/e7bacf72d89f5a3b97e22e97d/images/445f6cd8-d608-812b-8ca9-c9ce863ebfa3.png" /></a>
                                                                               </td>
 
 
                                                                             </tr>
                                                                           </tbody>
                                                                         </table>
                                                                       </td>
                                                                     </tr>
                                                                   </tbody>
                                                                 </table>
                                                               </td>
                                                             </tr>
                                                           </tbody>
                                                         </table>
                                                       </td>
                                                     </tr>
                                                   </tbody>
                                                 </table>
                                               </td>
                                             </tr>
                                           </tbody>
                                         </table>
                                       </td>
                                     </tr>
                                   </tbody>
                                 </table>
 
                               </td>
                             </tr>
                           </tbody>
                         </table>
 
                       </td>
                     </tr>
 
                   </tbody>
                 </table>
               </td>
             </tr>
 
 
             <tr>
               <td valign="top" id="templateFooter" style="padding:0px">
 
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                   style="min-width:100%; padding:0px">
                   <tbody class="mcnTextBlockOuter">
                     <tr>
                       <td valign="top" class="mcnTextBlockInner" class="mcnTextBlockInner"
                         style="padding:12px">
                         <table align="left" border="0" cellpadding="0" cellspacing="0"
                           style="max-width:100%; min-width:100%;" width="100%"
                           class="mcnTextContentContainer">
                           <tbody>
                             <tr>
 
                               <td valign="top" class="mcnTextContent" style="padding:0px">
 
                                 <div style="text-align: center;line-height: 25px;">
                                   <a href="#"
                                     style="color:#fff;text-decoration:none">Privacy
                                     Policy</a> <span style="color:#fff">|</span>
                                   <a href="#"
                                     style="color:#fff;text-decoration:none">Services
                                     Agreement</a><span style="color:#fff">
                                     |</span>&nbsp; <a href="#"
                                     style="color:#fff;text-decoration:none">www.foodstock.com</a>
                                 </div>
 
                               </td>
                             </tr>
                           </tbody>
                         </table>
 
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </center>
 
 
   <script type="text/javascript" src="/n1cY_i/s6Wr/9/-/k1veWlQtR903nGA/ipEJtzQfX0/ejRAYyE8BQU/eFA/eRFwgZwg"></script>
 </body>
 
 </html>`;
}
