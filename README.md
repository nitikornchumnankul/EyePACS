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

<h2>Enitiy Relation</h2>
<a href="https://drive.google.com/file/d/1WDyPYbReQN8f__Nu1PCawRcluQD6iq28/view?usp=sharing">Click Here</a>

<h2>API lists</h2>
<p>*** ฝั่ง Frontend ควรทำการติดตั้ง <strong>axios</strong> เพื่อความสะดวกในการเรียกใช้ API<br>
*** table ทุก table มีการใช้งาน API ที่เหมือนกันหมด ยกเว้น table ที่พิเศษคือ 4, 6, 12, 13<br>
*** ใช้เลขแทน table ทั่วไปเป็น n โดยที่ n หมายถึงจำนวนนับ 1, 2, 3, ...
</p>
<ul>
  <li><a href="#eye-photos">eye-photos</a></li>
  <li><a href="#table-n">table-n</a></li>
  <li><a href="#table-4">table-4</a></li>
  <li><a href="#table-6">table-6</a></li>
  <li><a href="#table-12">table-12</a></li>
  <li><a href="#table-13">table-13</a></li>
  <li><a href="#comments">comments</a></li>
  <li><a href="#users">users</a></li>
</ul>

<h2 id="eye-photos">eye-photos</h2>

<li><strong>Data Type</strong></li><br>

```javascript
images: new FormData()
search: string
eye_photo_id: string
eyeside: enum.EyeSide
status: enum.Status
```

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
            const res = await axios.get(`http://localhost:3000/eye-photos${search}`)
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
export const getEyePhotoById = (eye_photo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`http://localhost:3000/eye-photos/${eye_photo_id}`)
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update eyeside</strong></li><br>

```
http://localhost:3000/eye-photos/:eye_photo_id/update/eyeside
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
// eyeside is enum of 'LEFT' or 'RIGHT'
export const updateEyeSide = (eye_photo_id, eyeside) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/${eye_photo_id}/update/eyeside`,
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
http://localhost:3000/eye-photos/:eye_photo_id/update/status
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
// status is enum of 'DONE' or 'IN_PROGRESS'
export const updateEyeStatus = (eye_photo_id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/${eye_photo_id}/update/eyeside`,
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

<li><strong>Delete eye photo</strong></li><br>

```
http://localhost:3000/eye-photos/:eye_photo_id/delete
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const deleteEyePhoto = (eye_photo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`http://localhost:3000/${eye_photo_id}/delete`,
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="table-n">table-n</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
yes: boolean
cannot_grade: boolean
```

<li><strong>Create table-n</strong></li><br>

<p>อย่าลืมเปลี่ยน n นะครับ</p>

```
http://localhost:3000/table-n/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createTableN = (eye_photo_id, yes, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/table-n/${eye_photo_id}/create`,
                { yes, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update table-n</strong></li><br>

```
http://localhost:3000/table-n/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateTableN = (eye_photo_id, yes, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/table-n/${eye_photo_id}/update`,
                { yes, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="table-4">table-4</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
lower_2a: boolean
upper_2a: boolean
cannot_grade: boolean
```

<li><strong>Create table-4</strong></li><br>

```
http://localhost:3000/table-4/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createTable4 = (eye_photo_id, lower_2a, upper_2a, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/table-4/${eye_photo_id}/create`,
                { lower_2a, upper_2a, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update table-4</strong></li><br>

```
http://localhost:3000/table-4/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateTable4 = (eye_photo_id, lower_2a, upper_2a, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/table-4/${eye_photo_id}/update`,
                { lower_2a, upper_2a, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="table-6">table-6</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
lower_8a: boolean
upper_8a: boolean
cannot_grade: boolean
```

<li><strong>Create table-6</strong></li><br>

```
http://localhost:3000/table-6/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createTable6 = (eye_photo_id, lower_8a, upper_8a, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/table-6/${eye_photo_id}/create`,
                { lower_8a, upper_8a, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update table-6</strong></li><br>

```
http://localhost:3000/table-6/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateTable6 = (eye_photo_id, lower_8a, upper_8a, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/table-6/${eye_photo_id}/update`,
                { lower_2a, upper_2a, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="table-12">table-12</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
lower_2DD: boolean
lower_1DD: boolean
cannot_grade: boolean
```

<li><strong>Create table-12</strong></li><br>

```
http://localhost:3000/table-12/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createTable12 = (eye_photo_id, lower_2DD, lower_1DD, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/table-12/${eye_photo_id}/create`,
                { lower_2DD, lower_1DD, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update table-12</strong></li><br>

```
http://localhost:3000/table-12/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateTable12 = (eye_photo_id, lower_2DD, lower_1DD, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/table-12/${eye_photo_id}/update`,
                { lower_2DD, lower_1DD, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="table-13">table-13</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
cataract: boolean
glaucoma: boolean
occlusion: boolean
maculopathy: boolean
other: boolean
```

<li><strong>Create table-13</strong></li><br>

```
http://localhost:3000/table-13/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createTable13 = (eye_photo_id, cataract, glaucoma, occlusion, maculopathy, other, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/table-13/${eye_photo_id}/create`,
                { cataract, glaucoma, occlusion, maculopathy, other, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update table-13</strong></li><br>

```
http://localhost:3000/table-13/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateTable13 = (eye_photo_id, cataract, glaucoma, occlusion, maculopathy, other, cannot_grade) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/table-13/${eye_photo_id}/update`,
                { cataract, glaucoma, occlusion, maculopathy, other, cannot_grade },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="comments">comments</h2>

<li><strong>Data Type</strong></li><br>

```javascript
eye_photo_id: string
description: string
```

<li><strong>Create comment</strong></li><br>

```
http://localhost:3000/comments/:eye_photo_id/create
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const createComment = (eye_photo_id, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/comments/:eye_photo_id/${eye_photo_id}/create`,
                { description },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Update comment</strong></li><br>

```
http://localhost:3000/comments/:eye_photo_id/update
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateComment = (eye_photo_id, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`http://localhost:3000/comments/:eye_photo_id/${eye_photo_id}/update`,
                { description },
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Get comment by id</strong></li><br>

```
http://localhost:3000/comments/:eye_photo_id/get
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const updateComment = (eye_photo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`http://localhost:3000/comments/:eye_photo_id/${eye_photo_id}/get`)
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Delete comment</strong></li><br>

```
http://localhost:3000/comments/:eye_photo_id/delete
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const deleteComment = (eye_photo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`http://localhost:3000/comments/:eye_photo_id/${eye_photo_id}/delete`,
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<h2 id="users">users</h2>

<li><strong>Data Type</strong></li><br>

```javascript
username: string
password: string
```

<li><strong>Register</strong></li><br>

```
http://localhost:3000/register
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const register = (username, password, passwordConfirm) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/register`,
                { username, password, passwordConfirm },
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```

<li><strong>Login</strong></li><br>

```
http://localhost:3000/login
```

<p>ตัวอย่าง code สำหรับฝั่ง Frontend</p>

```javascript
export const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`http://localhost:3000/login`,
                { username, password },
            )
            resolve(res.data)
        } catch(e) {
            reject(e.response.data)
        }
    })
}
```
