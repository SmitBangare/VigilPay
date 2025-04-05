# VigilPay: Smart Indian Transaction Shield

A sophisticated fraud prevention platform built specifically for the Indian financial ecosystem. This Next.js application provides real-time transaction monitoring, AI-driven risk assessment, and fraud prevention capabilities tailored to Indian merchants, payment patterns, and regulatory requirements.

![VigilPay Dashboard](./public/dashboard-screenshot.png)

## 🌟 Key Features

- **Indian-Specific Context**: Fully adapted with Indian merchants, cities, and currency format (₹)
- **Real-time Transaction Monitoring**: Live dashboard with risk scoring and alerting
- **Multi-factor Risk Analysis**: Evaluates transactions based on amount, location, merchant, and frequency
- **Regional Pattern Recognition**: Accounts for state-specific spending behaviors and trust scores
- **MongoDB Integration**: Flexible schema design for rapid adaptation to emerging fraud patterns
- **Role-based Access Control**: Admin and regular user permission levels

## 💻 Tech Stack

- **Framework**: Next.js 15.1.0 with App Router
- **Database**: MongoDB 7.0.14
- **Authentication**: Custom JWT-based authentication
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization

## 📊 Dashboard Features

- Transaction volume monitoring with Indian Rupee (₹) formatting
- Risk distribution visualization
- Fraud metrics tracking
- Real-time alerts for suspicious activities
- Recent transaction monitoring

## 🏗️ System Architecture

```
app/
├── (auth)/         # Authentication route group
│   ├── login/      # Login page
│   ├── register/   # Registration page
│   └── layout.tsx  # Shared layout for auth pages
├── dashboard/      # Main dashboard
├── transactions/   # Transaction management
├── rules/          # Rules configuration
├── analytics/      # Analytics and reporting
├── ml-integration/ # Machine learning features
├── profile/        # User profile
├── settings/       # Application settings
└── api/            # API endpoints
lib/
├── auth-actions.ts # Authentication logic
├── auth-utils.ts   # JWT and password utilities
├── db.ts           # Database interface
└── mongodb.ts      # MongoDB connection
models/
└── User.ts         # User data model
scripts/
└── seed-db.js      # Database seeding script
```

## 🌍 Cultural Context-Aware Features

- Festival-sensitive risk thresholds for Diwali, Durga Puja, and other Indian festivals
- Family-based transaction pattern recognition for joint accounts
- State-specific merchant trust scoring
- Inter-state transaction analysis

## 📱 Mobile-First Authentication

- Designed for India's predominantly mobile internet userbase
- Works reliably in low-bandwidth areas
- Support for multiple Indian languages

## 🔒 Regulatory Compliance Integration

- Built-in monitoring for RBI (Reserve Bank of India) compliance
- UPI-specific risk models
- KYC (Know Your Customer) integration points

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 5+
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SmitBangare/vigilpay.git
cd vigilpay
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/vigilpay
```

4. Seed the database:
```bash
pnpm seed
```

5. Run the development server:
```bash
pnpm dev
```

6. Access the application at http://localhost:3000

### Default Credentials

- **Admin User**:
  - Email: admin@example.com
  - Password: admin123

## 🖼️ Screenshots

### Dashboard
![Dashboard](./public/dashboard.png)

### Transactions
![Transactions](./public/transactions.png)

### Alerts
![Alerts](./public/alerts.png)

## 🔄 How It's Different

Most fraud detection systems follow a predictable pattern. VigilPay stands out because:

1. **Cultural Context-Aware Risk Assessment**: Adapts to Indian festivals and family-based spending patterns
2. **Regional Variation Recognition**: Different trust scores for merchants based on their geographical presence
3. **Mobile-First Authentication**: Works reliably even in low-bandwidth rural areas
4. **Regulatory Compliance Integration**: Aligned with Indian regulatory frameworks (RBI, UPI)
5. **Socioeconomic Context Awareness**: Adjusts risk thresholds based on different income groups

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Smit Bangare - [GitHub Profile](https://github.com/SmitBangare)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/) 