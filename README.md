# 我的餐廳清單
這是一個供使用者收藏用的餐廳清單，記錄了所有餐廳和各餐廳的詳細資料，並打造了搜尋功能，讓使用者能快速找到特定餐廳。

## 產品模板
![ProductCover](https://github.com/EsmeNg/Restaurant_List/blob/main/restaurant_index.png?raw=true)
## 產品功能
1. 使用者可瀏覽清單的所有餐廳
2. 使用者可查看任一餐廳的詳細資料
3. 使用者可用餐廳中英文名字、類別作關鍵字，來尋找餐廳

## 環境建置
1. 打開終端機，複製下列程式碼，將專案clone至本機電腦
```
git clone https://github.com/EsmeNg/Restaurant_List.git
```

2. cd至此專案所在資料夾
```
cd
```

3. 下載npm套件，包括express、handlebars、body-parser和mongoose
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
