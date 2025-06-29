# TradeZone Admin Panel

A comprehensive admin panel for managing the TradeZone marketplace platform.

## 🏗️ Architecture

This admin panel follows a **decoupled architecture** with complete separation from the main frontend application:

- **Separate Next.js Application**: Independent admin app running on port 3001
- **Modular Component Structure**: Organized components for scalability
- **Service Layer**: API abstraction for backend communication
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Built with Radix UI and Tailwind CSS

## 📁 Project Structure

```
admin-panel/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Dashboard
│   │   ├── users/              # User management
│   │   ├── listings/           # Listing management
│   │   ├── analytics/          # Analytics dashboard
│   │   └── settings/           # Platform settings
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   └── providers/          # Context providers
│   ├── services/               # API service layer
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── constants/              # App constants
│   └── lib/                    # Core utilities
├── public/                     # Static assets
├── package.json                # Dependencies
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Features

### **Dashboard**
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons
- Performance indicators

### **User Management**
- Complete user listing with search/filter
- User profile management
- Role and permission control
- Account status management

### **Listing Management**
- Comprehensive listing overview
- Category and status filtering
- Bulk operations
- Featured listing management

### **Analytics**
- Platform performance metrics
- Revenue tracking
- User engagement analytics
- Category performance

### **Reports & Moderation**
- User report management
- Content moderation tools
- Priority-based handling
- Resolution tracking

### **Settings**
- Platform configuration
- Security settings
- Notification preferences
- Payment settings

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod
- **Theme**: next-themes

## 📦 Installation

1. Navigate to the admin panel directory:
```bash
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### API Integration
The admin panel uses a service layer for API communication. Update the API endpoints in `src/services/api.ts` to match your backend.

## 🎨 Customization

### Theming
- Colors and design tokens are defined in `tailwind.config.ts`
- CSS variables are in `src/app/globals.css`
- Theme switching is handled by `next-themes`

### Navigation
- Navigation items are configured in `src/constants/navigation.ts`
- Add new routes by updating the navigation array

### Components
- All UI components are in `src/components/ui/`
- Layout components are in `src/components/layout/`
- Custom components can be added to `src/components/`

## 🔐 Security

- Role-based access control
- Protected routes
- API authentication
- Input validation with Zod schemas

## 📱 Responsive Design

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new files
3. Follow the component naming conventions
4. Add proper type definitions
5. Test on multiple screen sizes

## 📄 License

This project is part of the TradeZone marketplace platform.