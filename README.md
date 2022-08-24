# 我的餐廳清單
這是一個供使用者收藏用的餐廳清單，記錄了所有餐廳和各餐廳的詳細資料，使用者可以搜尋、分類餐廳，也可以自行創建新的餐廳。

## 產品模板
![ProductCover](https://github.com/EsmeNg/Restaurant_List/blob/ef9e6a8ef2074b88bfff965cb2de0311d7ee26ce/public/mydata/restaurant_list_cover.png)
## 產品功能
1. 使用者可瀏覽所有餐廳
2. 使用者可創建、查看、修改、刪除一筆餐廳資料
3. 使用者可用餐廳名字來尋找餐廳
4. 使用者可以使用餐廳排列功能

## 環境建置
1. 打開終端機，複製下列程式碼，將專案clone至本機電腦
```
git clone https://github.com/EsmeNg/Restaurant_List.git
```

2. cd至此專案所在資料夾
```
cd
```

3. 下載npm套件，包括express、handlebars、body-parser、method-override和mongoose
```
npm install
```

4. 注入種子資料
```
npm run seed
```

5. 打開伺服器，執行主程式
```
nodemon app.js   // 若顯示you're running on localhost:3000，就代表連接成功
```

6. 打開瀏覽器，在URL輸入localhost:3000
