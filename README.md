# 🐾 Petstore API Test Automation

End-to-end API testing project for Petstore using **Jest**, **Supertest**, **jest-cucumber** (Gherkin), and **JSON Schema** validation.

---

## 📦 Tech Stack

| Tool                | Purpose                              |
|---------------------|--------------------------------------|
| **Jest**            | Test runner                          |
| **jest-cucumber**   | BDD Gherkin integration for Jest     |
| **Supertest**       | HTTP client for API testing          |
| **Faker**           | Generate random test data            |
| **jsonschema**      | Validate response schema             |
| **dotenv**          | Manage environment variables         |
| **jest-html-reporter** | Generate test report in HTML     |

---

## 📁 Project Structure

```
petstore-api-test/
├── features/
│   └── pet/
│       ├── add-pet.feature         # Gherkin scenarios
│       └── get-pet.feature
├── src/
│   ├── controller/                 # Controller layer (API abstraction)
│   ├── json_schema/               # JSON schema for response validation
│   ├── step-definitions/          # Step implementation for Gherkin
│   ├── tests/                     # Traditional Jest tests (optional)
│   └── utils/                     # Reusable utilities (e.g., schema validator)
├── reports/                       # Test reports (HTML, JUnit)
├── .env                           # Environment variables (e.g., BASE_URL)
├── jest.config.js                 # Jest configuration
├── package.json                   # Dependencies & scripts
└── tsconfig.json                  # TypeScript config
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file:
```env
BASE_URL=https://petstore.swagger.io/v2
```

---

## 🚀 Running Tests

### ✅ Run All Tests (BDD + Traditional)
```bash
npm test
```

### 🧪 Run Only BDD Scenario
```bash
npx jest features/step-definitions/add-pet.steps.ts
```

### 📄 Generate HTML Report
```bash
npm run test:report
```
Output: `./reports/test-report.html`

---

## 🧪 Example Scenario: Add Pet

**Feature:** Add a new pet  
**Scenario:** Successfully add a new pet with different statuses  
**Gherkin:** `features/pet/add-pet.feature`

```gherkin
Scenario Outline: Successfully add a new pet with pet "<petStatus>" status
  Given I have a pet payload with status "<petStatus>"
  When I submit the payload to the Add Pet endpoint
  Then I should receive a 200 response
  And the response should be equal as payload body provided
  And the response should be equal as json schema

Examples:
  | petStatus  |
  | available  |
  | pending    |
  | sold       |
```

---

## ✅ Test Features

- ✅ API contract testing (status, response schema)
- ✅ Dynamic payloads using `faker`
- ✅ Gherkin-style readable tests
- ✅ JSON schema response validation
- ✅ CI/CD-compatible test reports

---


## 👨‍💻 Maintainer

Built and maintained by Kgs. Azzam Nizar.

---