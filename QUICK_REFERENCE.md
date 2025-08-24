# Cancellation Flow - Quick Reference Guide

## 🚀 Quick Start

### Entry Point
```typescript
<CancellationFlow
  isOpen={showCancellationFlow}
  onClose={() => setShowCancellationFlow(false)}
  subscriptionId="sub_123"
  userId="user_456"
/>
```

### Main Flow Controller
- **File**: `src/components/CancellationFlow.tsx`
- **State**: Manages `currentStep` using `FlowStep` type
- **Navigation**: Handles all screen transitions and back button logic

## 📱 Screen Structure

### Job Found Path (User found a job)
```
Initial Question → Congrats → [Multiple Options] → Close Flow
```

**Screens**:
1. `initial` - Entry point
2. `congrats` - Survey form
3. `yesWithMM` - Found job WITH MigrateMate
4. `noHelpWithVisa` - Don't need visa help
5. `feedback` - Additional feedback
6. `noWithoutMM` - Found job WITHOUT MigrateMate
7. `visaHelp` - Need visa assistance

### Downsell Path (User still looking)
```
Initial Question → Downsell → [Multiple Options] → Close Flow
```

**Screens**:
1. `initial` - Entry point
2. `downsell` - A/B testing offer
3. `offerAccept1` - Discount accepted
4. `offerDeclined` - Survey after declining
5. `cancelReason` - Reason collection
6. `cancelComplete` - Final confirmation

## 🔄 Navigation Patterns

### Forward Navigation
- **Form Validation**: Required fields must be completed
- **Conditional Logic**: Different paths based on user choices
- **A/B Testing**: Variant assignment affects pricing and flow

### Back Navigation
- **Context-Aware**: Back button goes to logical previous step
- **Progress Tracking**: Shows current step and total steps
- **State Preservation**: Form data maintained when going back

## 🎯 Key Features

### A/B Testing
```typescript
type DownsellVariant = 'A' | 'B';

// Variant A: $39 → $19.50 (50% off)
// Variant B: $25 → $12.50 (50% off)
```

### Form Validation
- Survey questions require all fields completed
- Cancellation reasons may need additional details
- Minimum character requirements for feedback

### Data Persistence
- All user interactions saved to database
- A/B testing variants persisted per user
- Cancellation reasons and details stored

## 🛠️ Development

### Adding New Screens
1. Create component in appropriate folder (`job-found/` or `downsell/`)
2. Add to `FlowStep` type in `types.ts`
3. Export from folder's `index.ts`
4. Add to main `screens/index.ts`
5. Update `CancellationFlow.tsx` render logic
6. Update back button navigation logic
7. Update progress indicator

### Screen Props Pattern
```typescript
interface ScreenProps {
  // Navigation callbacks
  onContinue?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  
  // Data
  variant?: DownsellVariant;
  data?: any;
  
  // UI state
  isLoading?: boolean;
  error?: string;
}
```

### State Management
```typescript
const [currentStep, setCurrentStep] = useState<FlowStep>('initial');
const [downsellVariant, setDownsellVariant] = useState<DownsellVariant>('A');
const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({...});
```

## 📊 Progress Indicators

### Step Counting
- **Job Found Path**: 3 steps maximum
- **Downsell Path**: 4 steps maximum (including cancelComplete)
- **Dynamic**: Shows "Step X of Y" based on current path

### Visual Indicators
- Progress dots show current step
- Back button available on all screens except initial
- Close button (X) always available in header

## 🔒 Security & Validation

### Input Validation
- All user inputs validated before processing
- Required field indicators with asterisks
- Character minimums for text inputs
- Radio button selection required

### Database Security
- Row-Level Security (RLS) policies
- User ID validation for all operations
- Input sanitization and validation
- Secure error handling

## 🎨 Styling

### Design System
- **Tailwind CSS** for styling
- **Consistent spacing**: 5px grid system
- **Color palette**: Gray scale with purple/green accents
- **Typography**: DM Sans font family
- **Responsive**: Mobile-first design

### Component Patterns
- Consistent button sizes (h-[52px])
- Standard padding (p-5)
- Rounded corners (rounded-lg, rounded-[20px])
- Hover states and focus rings

## 🧪 Testing

### Component Testing
- Each screen can be tested independently
- Mock navigation callbacks for testing
- Form validation testing
- A/B testing variant testing

### Integration Testing
- Full flow navigation testing
- Database persistence testing
- Error handling testing
- Responsive design testing

## 🚨 Common Issues

### Navigation Problems
- Check `FlowStep` type includes new screen
- Verify back button logic in `handleBack`
- Ensure progress indicator logic updated

### Form Validation
- Check required field validation
- Verify error message display
- Test form submission logic

### A/B Testing
- Ensure variant assignment is deterministic
- Check pricing calculations
- Verify variant persistence

## 📚 Related Files

- **Main Flow**: `src/components/CancellationFlow.tsx`
- **Types**: `src/components/screens/types.ts`
- **Database**: `src/lib/supabase.ts`
- **Styling**: `src/app/globals.css`
- **Documentation**: `CANCELLATION_FLOW_README.md`, `FLOW_DIAGRAM.md`
