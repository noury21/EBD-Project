# [Project name]

> How to use this template (Course Project brief, section 5):
> 1. Rename this file to `README.md` and put it in the root of your repository,
>    next to `backend/` and `frontend/`.
> 2. Replace everything in [square brackets], brackets included.
> 3. Delete every line that starts with `>`, like this one.
> 4. Keep the headings and their numbers. Do not rename, reorder or delete sections.
> 5. Push to `main` by **Thursday 12 November 2026, 23:59** (Submission 1).

**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team


| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Hassan wael | 16002058  | T3 | hassanalamir |
| Fady Rober | 16001778 | T3 | fadyrober42-a11y |
| Ali Osama | 16003128 | T3 | ali007soliman-pixel |
| youssef essam | 16001942 | T3 | hamo888 |
| Nour medhat | 16001233 | T1 | noury21 |

## 2. The idea


GIU App is a university services web application for students and staff (TA's and lecturers) at the German International University. It brings selected academic and campus services into one platform. Students can view their grades and attendance, submit examination requests, and use a marketplace to list and discover second-hand stationary. TA's can manage attendance for their assigned courses, while lecturers can enter grades for their assigned courses. The aim is to reduce reliance on scattered systems, paper forms, and informal messaging groups by providing role-based access to relevant university services.

## 3. Features

### 3.1 The full product

- Student self-registration and secure login.
- Staff accounts for teaching assistants and lecturers created by an authorized administrator; staff cannot choose a staff role through public registration.
- Role-based dashboards and permissions for students, teaching assistants, and lecturers.
- Students can view their current and previous grades and academic transcript.
- Lecturers can enter, edit, and delete grades for students in their assigned courses.
- Students can view attendance records and absence warnings.
- Teaching assistants can open and close attendance sessions for their assigned courses; students can mark themselves present using a session code.
- Students can submit examination excuses and make-up examination registration requests and follow their request status.
- Authorized staff can review examination requests in the complete product. Staff review and approval workflows are outside the use cases implemented for this course.
- Students can create, browse, edit, mark as sold, and delete their own marketplace listings.
- Students can send purchase requests for marketplace items. Purchase-request handling is part of the complete product and is not included in the course implementation.
- Students can view their course schedules, group schedules, and submit group-change requests.
- Students and staff can browse food court menu items and prices, place food orders, and view order status.
- Students and staff can reserve food court tables and manage or cancel their reservations.
- Additional university services may include exam-seat selection, online assessments, remarking requests, course evaluations, financial requests, course-work uploads, summer and language course registration, thesis and internship services, bus and trip reservations, event registration, and carpooling. These are part of the full product vision and are not included in the course implementation.

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email and password; logs in with email and password | Their home page, with their name in the header | A User, with the password hashed |
| 2 | Enter and check grades | A lecturer adds a grade for a student in an assigned course, edits it, or deletes it. A student opens their grades and views results by course and semester. | Lecturers see the grades they are authorized to manage. Students see only their own grades and results. | A Grade document linked to the student, course, and lecturer who entered it. |
| 3 | Mark and show attendance | A teaching assistant opens an attendance session for an assigned course and group, then closes it. A student enters the session code to mark themselves present. | Teaching assistants see session details and attendance records. Students see their attendance by course and any absence warning. | An AttendanceSession document and Attendance documents linking each student to the relevant session. |
| 4 | Submit an exam excuse and make-up registration request | A student submits an excuse for a midterm or final exam, provides the reason and supporting-document link, and indicates whether they request make-up registration. The student can edit or withdraw a request while it is pending. | The student sees confirmation, their submitted requests, and each request's current status. Staff review/approval is outside this course use case. | An AcademicRequest document linked to the student, including exam details, reason, attachment link, make-up request, and status. |
| 5 | Sell items on the marketplace | A student creates a listing, edits their own listing, marks it as sold, or deletes it. Other students browse available listings. Purchase requests are part of the full product but are not built in this course. | Students see available listings and a “My listings” view showing their own listings and their status. | A Listing document linked to the seller, including item details, price, condition, contact information, and availability status. |


## 4. Who owns what



| Member | Use case |
|---|---|
| Nour Medhat | 1. Registration and login |
| Hassan Wael | 2. Enter and check grades |
| Ali Ossama | 3. Mark and show attendance |
| Fady Rober | 4. Submit an exam excuse and make-up registration request |
| Youssef Essam | 5. Sell items on the marketplace |

## 5. Data model

> The Mongoose schema of every model you plan to use, one heading per model.
> The User schema is given: add fields if you need them. Add a heading for
> each extra model you need.

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
});
```

### Grade

```js
const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseName: { type: String, required: true },
  semester: { type: String, required: true },
  gradeValue: { type: Number, required: true },
  maxGrade: { type: Number, default: 100 }
}, { timestamps: true });
```
### Attendance

```js
const attendanceSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'AttendanceSession', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' }
}, { timestamps: true });
```

### AttendanceSession

```js
const attendanceSessionSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  group: { type: String, required: true },
  ta: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionCode: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

### AcademicRequest

```js
const academicRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examDetails: { type: String, required: true },
  reason: { type: String, required: true },
  supportingDocumentLink: { type: String, required: true },
  requestType: { type: String, enum: ['Excuse', 'Make-up Registration'], required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });
```
### Listing

```js
const listingSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemDetails: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  contactInformation: { type: String, required: true },
  availabilityStatus: { type: String, enum: ['Available', 'Sold'], default: 'Available' }
}, { timestamps: true });
```

## 6. Run it locally

> Leave this section as it is until Submission 2 (Thursday 10 December 2026,
> 23:59). Then fill it in: we follow these steps to run your project.

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].
