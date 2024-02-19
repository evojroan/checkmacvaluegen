# 這是什麼？

這是綠界科技的全方位金流 / 物流 / 電子發票系統中，計算出檢查碼 (CheckMacValue)的機制。
可以使用本程式碼，計算出訂單所需的檢查碼。

[綠界科技技術文件：檢查碼機制](https://developers.ecpay.com.tw/?p=2902)

# 什麼是檢查碼？為什麼需要檢查碼？

將發送給綠界科技金流系統的所需參數，經過本機制的計算後，最後得到的雜湊值(Hash)。目的是為了確認參數發送者是本人，而非假冒。

進一步了解雜湊演算法與其應用，請參閱：
[用 Node.js 輕鬆實現雜湊演算法 — — Hash 與 Hmac](http://tinyurl.com/3dyh5nzz)

# 如何使用本程式？

1. 只要到「本區請自行修改」區域修改參數即可。
2. 請選擇使用的演算法。
3. 請輸入自己的 HashKey/ HashIV。
4. 請於變數 parameters 修改要發送的參數與參數值。變數 parameters 有物件格式或是字串格式，請擇其中一種格式使用，另一個格式請註解掉。
5. 執行本程式碼後，於控制台可得到檢查碼以及其計算過程。
6. 算出來的 CheckMacValue 也可用於爾後串接綠界系統。

# 關於本程式碼的進一步說明

[綠界科技檢查碼(CheckMacValue)產生器](http://tinyurl.com/mtmhmmtk)

# 關於本作者

光頭工程師 Roan
[Medium 網誌](https://medium.com/@roan6903)
