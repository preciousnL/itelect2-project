# **itelect2-project**
My IT Elective 2 backend web development project.

**GT1:** Git Foundations<br>
**GT2:** Branching NodeJS<br>
**GT3:** AdvanceJS ES6 v3<br>
**GT4:** AsyncJS Error Handling<br>
**GT5:** Node Express<br>
**GT6:** Rest API

## **API Testing**
Graded Task 6: Rest API (Testing)

---

### **GET**
---
![](screenshots/get.png)
Get users

---

### **POST**
---
![](screenshots/post.png)
Post task

![](screenshots/post-error.png)
Post task return error 400 when post with missing title.

---

### **PUT**
---
![](screenshots/put.png)
Put with an existing id returns 200.

![](screenshots/put-error.png)
Put with id 999 returns 404.

---

### **DELETE**
---
![](screenshots/delete.png)
Delete with an existing id returns 200.

![](screenshots/delete-error.png)
Delete on the same id returns 404.

## **Relationship Queries**
Graded Task 8: Relationship Queries (Testing)

---

### **GET**
---
![](screenshots/get-gt8.png)
Get tasks: returns each task with a User object nested inside it.

![](screenshots/get-error-gt8.png)
Get ID 999: returns 404, not 500 and not an empty 200.

---

### **POST**
---
![](screenshots/post-gt8.png)
Post task: returns 201 and an id not sent

![](screenshots/post-error-gt8.png)
Post task: return error 400 when post with missing title.

---

### **PUT**
---
![](screenshots/put-gt8.png)
Put with an existing id returns 200.

---

### **DELETE**
---
![](screenshots/delete-gt8.png)
Delete with an existing id returns 200.

![](screenshots/delete-error-gt8.png)
Delete on the same id returns 404.