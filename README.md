# EyePACS Backend v1.0.0
<h2>Install the project</h2>
<ul>
  <li>ติดตั้ง <a href="https://www.postgresql.org/">PostgresSQL</a></li>
  <li>ติดตั้ง <a href="https://git-scm.com/downloads">Git</a></li>
  <li>ติดตั้ง <a href="https://nodejs.org/en/">Node.js</a></li>
  <li>ติดตั้ง <a href="https://nodejs.org/en/">Postman</a> (กรณีที่ต้องการทดสอบ API)</li>
</ul>
<p>หลังจากติดตั้งโปรแกรมต่างๆตามข้างต้นเรียบร้อยแล้ว ให้ทำการเปิด <strongTerminal</strong> หรือ <strong>cmd</strong> เพื่อทำการ <strong><i>Run</i></strong> คำสั่งด้านล่างตามลำดับ</p>

```
git clone https://github.com/Rayato159/EyePACS.git
cd EyePACS/backend&&yarn install
```

<h2>Start the project</h2>

<p>ก่อน Run Project ให้ทำการเปิด <strong>pgAdmin</strong> ก่อนทุกครั้ง</p>

```
yarn start:dev
```

<h2>Environment Config</h2>

<p>File: <a href="https://github.com/Rayato159/EyePACS/blob/main/backend/.env.stage.dev">.env.stage.dev</a></p>

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=eyepacsdb
JWT_SECRET=zUqR-6+GyLSE>=Ah
PHOTOS_PATH=./uploads/eye-photos
```

<p>Port สำหรับตัว NestJS (สามารถเปลี่ยนได้ตามความต้องการ)</p>

```
3000
```

<h2>API lists</h2>
<p>*** ฝั่ง Frontend ควรทำการติดตั้ง <strong>axios</strong> เพื่อความสะดวกในการเรียกใช้ API</p>
<ul>
  <li><a href="#eye-photos">eye-photos</a></li>
  <li><a href="#table-1">table-1</a></li>
  <li><a href="#table-2">table-2</a></li>
  <li><a href="#table-3">table-3</a></li>
  <li><a href="#table-4">table-4</a></li>
  <li><a href="#table-5">table-5</a></li>
  <li><a href="#table-6">table-6</a></li>
  <li><a href="#table-7">table-7</a></li>
  <li><a href="#table-8">table-8</a></li>
  <li><a href="#table-9">table-9</a></li>
  <li><a href="#table-10">table-10</a></li>
  <li><a href="#table-11">table-11</a></li>
  <li><a href="#table-12">table-12</a></li>
  <li><a href="#table-13">table-13</a></li>
</ul>

<h2 id="eye-photos">eye-photos</h2>

<li><strong>Upload eye photos</strong></li><br>

```
http://localhost:3000/eye-photos/uploads
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const uploadEyePhotos = (images) => {

    let formData = new FormData()
    for(let i=0; i<images.length; i++) {
        formData.append('images', images[i])
    }

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/eye-photos/uploads`,  
                formData,
                {
                    headers: { 
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Get eye photos</strong></li><br>

```
http://localhost:3000/eye-photos?search=<query>
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const getEyePhotos = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/eye-photos${search}`)
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Get eye photo by id</strong></li><br>

```
http://localhost:3000/eye-photos/:eye_photo_id
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const getEyePhotos = (eye_photo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/eye-photos/${eye_photo_id}`)
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update eyeside</strong></li><br>

```
http://localhost:3000/:eye_photo_id/update/eyeside
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
// eyeside is enum of 'LEFT' or 'RIGHT'
export const getEyePhotos = (eye_photo_id, eyeside) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/${eye_photo_id}/update/eyeside`,
                { eyeside },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update eyes status</strong></li><br>

```
http://localhost:3000/:eye_photo_id/update/status
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
// status is enum of 'DONE' or 'IN_PROGRESS'
export const getEyePhotos = (eye_photo_id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/${eye_photo_id}/update/eyeside`,
                { status },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```
