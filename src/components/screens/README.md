# Cancellation Flow Screens

This folder contains the individual screen components for the subscription cancellation flow, making the code more maintainable and easier to edit.

## Structure

```
screens/
├── index.ts              # Export all components and types
├── types.ts              # Shared TypeScript interfaces and types
├── job-found/            # Screens for users who found jobs
│   ├── index.ts          # Export job-found screens
│   ├── InitialQuestionScreen.tsx    # Step 1: Initial job status question
│   └── CongratsScreen.tsx           # Step 2A: Survey for users who found jobs
├── downsell/             # Screens for downsell offer flow
│   ├── index.ts          # Export downsell screens
│   └── DownsellScreen.tsx           # Step 2B: A/B testing offer for users still looking
└── README.md             # This documentation
```

## Components

### InitialQuestionScreen
- **Purpose**: First step of the cancellation flow
- **Props**: `onJobFoundAnswer: (answer: 'yes' | 'no') => void`
- **Features**: 
  - Welcoming message with "Hey mate, Quick one before you go"
  - Main question: "Have you found a job yet?" (italic styling)
  - Two action buttons with proper radio button semantics
  - Uses the exact design styling from the provided mockup

### CongratsScreen
- **Purpose**: Survey form for users who found jobs
- **Props**: 
  - `surveyAnswers: SurveyAnswers`
  - `onSurveyAnswerChange: (question, value) => void`
  - `onContinue: () => void`
  - `isFormValid: boolean`
- **Features**:
  - 4 survey questions with radio button options
  - Form validation to ensure all questions are answered
  - Continue button (disabled until form is complete)
  - Consistent button styling with the main app theme

### DownsellScreen
- **Purpose**: A/B testing offer for users still looking for jobs
- **Props**:
  - `downsellVariant: 'A' | 'B'`
  - `onDownsellResponse: (accepted: boolean) => void`
- **Features**:
  - Different pricing based on A/B testing variant
  - Variant A: 50% off ($12.50/month)
  - Variant B: $10 off ($15/month)
  - Accept/Reject buttons with proper styling

## Types

### SurveyAnswers
```typescript
interface SurveyAnswers {
  foundJobWithMigrateMate: string;
  rolesApplied: string;
  companiesEmailed: string;
  companiesInterviewed: string;
}
```

### FlowStep
```typescript
type FlowStep = 'initial' | 'congrats' | 'downsell';
```

### DownsellVariant
```typescript
type DownsellVariant = 'A' | 'B';
```

## Benefits of This Structure

1. **Maintainability**: Each screen is a separate component, making it easier to modify individual steps
2. **Reusability**: Components can be reused or modified independently
3. **Testing**: Each screen can be tested in isolation
4. **Code Organization**: Clear separation of concerns with logical grouping
5. **Type Safety**: Shared types ensure consistency across components
6. **Easier Editing**: Developers can focus on one screen at a time
7. **Logical Flow**: Screens are grouped by user journey (job-found vs downsell)

## Logical Grouping

### Job Found Flow (`job-found/`)
- **InitialQuestionScreen**: First step asking if user found a job
- **CongratsScreen**: Survey form for users who found jobs
- These screens handle the "success path" where users have found employment

### Downsell Flow (`downsell/`)
- **DownsellScreen**: A/B testing offer for users still looking
- This screen handles the "retention path" where users haven't found jobs yet

## Usage

```typescript
import { 
  InitialQuestionScreen, 
  CongratsScreen, 
  DownsellScreen 
} from '@/components/screens';

// Use in your main component
{currentStep === 'initial' && (
  <InitialQuestionScreen onJobFoundAnswer={handleJobFoundAnswer} />
)}
```

## Future Enhancements

- Add individual screen tests
- Create screen-specific styling files
- Add animation transitions between screens
- Implement screen-specific analytics tracking
