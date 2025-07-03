# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 구글 appsScript

1. 구글 시트를 생성한다.

2. 확장프로그램 > appsScript

```
function doGet(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('1ndwiFIUf44B-Kk7Xr4X3jnfQldAT7Mivh0QLrMso-Ac').getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    // 시트에 저장
    var row = [
      new Date(),
      data.name,
      data.department,
      data.eventType,
      data.amount,
      data.bank,
      data.account,
      data.fileName || ''
    ];
    sheet.appendRow(row);

    // HTML 메일 내용
    var htmlBody = `
      <div style="font-family: 'Pretendard', 'Malgun Gothic', Arial, sans-serif; max-width: 480px; margin: 0 auto; border-radius: 16px; border:1px solid #eee; box-shadow:0 2px 8px #eee; background: #fff;">
        <h2 style="background: #7052ED; color: #fff; padding: 24px 0; margin: 0; border-radius: 16px 16px 0 0; text-align: center;">상조회 경조금 신청서</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 1rem;">
          <tbody>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px; width: 120px;">이름</td>
              <td style="padding: 10px 16px;">${data.name}</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">부서</td>
              <td style="padding: 10px 16px;">${data.department}</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">경조항목</td>
              <td style="padding: 10px 16px;">${data.eventType}</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">금액</td>
              <td style="padding: 10px 16px;">${Number(data.amount).toLocaleString()}원</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">은행명</td>
              <td style="padding: 10px 16px;">${data.bank}</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">계좌번호</td>
              <td style="padding: 10px 16px;">${data.account}</td>
            </tr>
            <tr>
              <td style="background: #f6f6fa; font-weight: bold; padding: 10px 16px;">첨부파일</td>
              <td style="padding: 10px 16px;">${data.fileName || '없음'}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align:center; color:#888; font-size:0.95rem; padding: 18px 0 8px 0;">상조회 경조금 신청 알림 메일</div>
      </div>
    `;

    // 첨부파일 처리
    var attachments = [];
    if (data.fileBase64 && data.fileName) {
      var contentType = getMimeType(data.fileName);
      var bytes = Utilities.base64Decode(data.fileBase64.split(',').pop());
      var blob = Utilities.newBlob(bytes, contentType, data.fileName);
      attachments.push(blob);
    }

    // 메일 전송
    MailApp.sendEmail({
      to: 'hueleev@dkitec.com', // 실제 받을 이메일로 변경
      subject: '[상조회 경조금 신청] ' + data.name + '님의 신청',
      htmlBody: htmlBody,
      attachments: attachments
    });

    return ContentService
       .createTextOutput(JSON.stringify({
          success: true,
          data: { message: '처리 완료' }
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } catch (error) {
      return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// 파일 확장자에 따른 MIME 타입 반환
function getMimeType(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  var map = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'hwp': 'application/x-hwp',
    // 필요시 확장자 추가
  };
  return map[ext] || 'application/octet-stream';
}
```

스크립트 내에 적힌 이메일을 수신하고 싶은 이메일로 수정한다.

3. 배포 > 새배포 를 클릭하고 `모든 사용자` 권한으로 배포한다.

4. vercel.json 과 vite.config.ts 파일에 적힌 url을 수정한다.
