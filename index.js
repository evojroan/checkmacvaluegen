////////本區請自行修改
//使用的演算法，請自行修改為 'sha256' 或 'md5'
const algorithm = 'sha256';

//請自行修改 HashKey 與 HashIV
const hashkey = 'pwFHCqoQZGmho4w6'; //3002607
const hashiv = 'EkRm7iFT261dpevs'; //3002607

//請自行選擇並修改變數
// const parameters = {
//   MerchantID: '3002607',
//   MerchantTradeNO: 'ecpay20240101000000',
//   MerchantTradeDate: '2024/01/01 00:00:00',
//   PaymentType: 'aio',
//   TotalAmount: '100',
//   TradeDesc: 'testtrade',
//   ItemName: 'testitem',
//   ReturnURL: 'https://test.test',
//   ChoosePayment: 'ALL',
//   EncryptType: '1'
// };
const parameters =
  'TradeDesc=促銷方案&PaymentType=aio&MerchantTradeDate=2023/03/12 15:30:23&MerchantTradeNo=ecpay20230312153023&MerchantID=3002607&ReturnURL=https://www.ecpay.com.tw/receive.php&ItemName=Apple iphone 15&TotalAmount=30000&ChoosePayment=ALL&EncryptType=1';

////////以下不須修改
import { createHash } from 'crypto';
let method;
if (algorithm === 'sha256') {
  method = 'SHA256';
} else if (algorithm === 'MD5') {
  method = 'MD5';
}

function CheckMacValueGen(parameters, algorithm, digest) {
  let Step0;
  if (typeof parameters === 'string') {
    Step0 = parameters;
  } else if (typeof parameters === 'object') {
    Step0 = Object.entries(parameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  function DotNETURLEncode(string) {
    const list = {
      '%2D': '-',
      '%5F': '_',
      '%2E': '.',
      '%21': '!',
      '%2A': '*',
      '%28': '(',
      '%29': ')',
      '%20': '+'
    };

    Object.entries(list).forEach(([encoded, decoded]) => {
      const regex = new RegExp(encoded, 'g');
      string = string.replace(regex, decoded);
    });

    return string;
  }

  const Step1 = Step0.split('&')
    .sort((a, b) => {
      const keyA = a.split('=')[0];
      const keyB = b.split('=')[0];
      return keyA.localeCompare(keyB);
    })
    .join('&');
  const Step2 = `HashKey=${hashkey}&${Step1}&HashIV=${hashiv}`;
  const Step3 = DotNETURLEncode(encodeURIComponent(Step2));
  const Step4 = Step3.toLowerCase();
  const Step5 = createHash(algorithm).update(Step4).digest(digest);
  const Step6 = Step5.toUpperCase();

  return `
  檢核碼計算順序
(1) 將傳遞參數依照第一個英文字母，由A到Z的順序來排序(遇到第一個英名字母相同時，以第二個英名字母來比較，以此類推)，並且以&方式將所有參數串連。
${Step1}

(2) 參數最前面加上HashKey、最後面加上HashIV
${Step2}

(3) 將整串字串進行URL encode
${Step3}

(4) 轉為小寫
${Step4}

(5) 以 ${method} 方式產生雜凑值
${Step5}

(6) 再轉大寫產生 CheckMacValue
${Step6}
  `;
}

console.log(CheckMacValueGen(parameters, algorithm, 'hex'));
