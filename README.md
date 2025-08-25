# Migrate Mate - Subscription Cancellation Flow

A modern, user-friendly subscription cancellation Flow for  MigratetMate built with Next.js 15, React 19, and Supabase. This implementation provides an intuitive multi-step flow for handling subscription cancellations with smart downsell strategies and comprehensive user feedback collection.

## 🚀 Features

### **Core Functionality**
- **Multi-Step Cancellation Flow**: Guided 3-step process with progress indicators
- **Smart Downsell System**: A/B testing for retention offers with 50% discount
- **Context-Aware Navigation**: Intelligent back button logic based on user journey
- **Progress Tracking**: Visual progress indicators with completion states
- **Responsive Design**: Mobile-first design with desktop optimizations

### **User Experience**
- **Personalized Flows**: Different paths based on user responses
- **Survey Collection**: Comprehensive feedback gathering for service improvement
- **Visa Assistance**: Specialized support for visa-related cancellations
- **Job Success Tracking**: Integration with job search outcomes
- **Smooth Transitions**: Seamless screen-to-screen navigation

### **Technical Features**
- **TypeScript**: Full type safety and IntelliSense support
- **Tailwind CSS**: Modern, utility-first styling
- **Supabase Integration**: Real-time database with authentication
- **ESLint**: Code quality and consistency
- **Next.js 15**: Latest React framework with App Router

## 🏗️ Architecture

### **Component Structure**
```
src/
├── components/
│   ├── CancellationFlow.tsx     # Main flow controller
│   ├── screens/                 # Individual screen components
│   │   ├── job-found/          # Job-related screens
│   │   └── downsell/           # Downsell flow screens
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── supabase.ts             # Database configuration
│   └── utils.ts                # Utility functions
└── app/                        # Next.js app router
```

### **Flow Steps**
1. **Initial Question**: Job search status assessment
2. **Survey Collection**: User feedback and experience data
3. **Path Resolution**: Job success, visa help, or downsell options
4. **Downsell Flow**: Retention offers with A/B testing
5. **Completion**: Final confirmation and next steps

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Development**: ESLint, Turbopack
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase CLI (for local development)
- Git

## 🚀 Getting Started

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd cancel-flow-task-main
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **4. Database Setup**
```bash
# Start Supabase locally
npm run db:setup

# Reset database (if needed)
npm run db:reset
```

### **5. Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:setup` - Initialize local database
- `npm run db:reset` - Reset local database

## 🔧 Configuration

### **Flow Steps Configuration**
The application uses a `FlowStepConfig` class to manage step behavior:

```typescript
new FlowStepConfig(
  name: string,           // Step identifier
  stepNumber: number,     // Current step (1-4)
  totalSteps: number,     // Total steps in flow
  isCompletion: boolean,  // Is this a completion step?
  imageHeight: string,    // Background image height
  hideProgress: boolean,  // Hide progress indicator?
  hideBackButton: boolean, // Hide back button?
  headerText: string      // Custom header text
)
```

### **Downsell Variants**
- **Variant A**: $19.50/month (50% off $39)
- **Variant B**: $12.50/month (50% off $25)

## 🎨 Customization

### **Styling**
- Modify `tailwind.config.ts` for theme changes
- Update component classes for visual adjustments
- Customize colors in `globals.css`

### **Flow Logic**
- Add new steps in `FLOW_STEPS` configuration
- Create new screen components in `screens/` directory
- Update navigation logic in `CancellationFlow.tsx`

### **Database Schema**
- Modify `seed.sql` for data structure changes
- Update Supabase types and queries
- Add new tables as needed

## 🧪 Testing

### **Manual Testing**
1. Navigate through all flow steps
2. Test back button functionality
3. Verify downsell variants
4. Check responsive design
5. Test form validation

### **Code Quality**
```bash
npm run lint          # Check code quality
npm run build         # Verify build process
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Compatible with Next.js
- **Railway**: Full-stack deployment
- **Self-hosted**: Docker or traditional hosting


---

**Built with ❤️ using Next.js, React, and Supabase**
