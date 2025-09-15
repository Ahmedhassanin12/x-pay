# XPay Mini Console

A simple payment processing console built with Next.js 14, TypeScript, and file-based storage.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── page.tsx                    # Home page with payment list and filters
├── new/page.tsx               # New payment creation form  
├── payments/[id]/page.tsx     # Payment details and management
├── pay/[publicId]/page.tsx    # Customer payment link page
├── layout.tsx                 # App layout with navigation
├── globals.css                # Application styles
└── not-found.tsx              # 404 error page

lib/
├── db.ts                      # File-based storage operations
└── id.ts                      # ID generation utilities
types/
├── types.ts                   # TypeScript type definitions
actions/
└── payments.ts                # Server actions for payment operations


```

## Features Implemented

### ✅ Core Features
- **Home Page (/)**: Payment list, search by merchant order ID, status filtering
- **New Payment (/new)**: Form to create payments with validation
- **Payment Details (/payments/[id])**: Complete payment information and copyable link
- **Payment Link (/pay/[publicId])**: Customer-facing page to mark payments as paid/canceled

### ✅ Technical Requirements
- Next.js App Router with TypeScript
- Server Actions for all write operations (no API routes)
- Proper revalidation using `revalidatePath()`
- In-memory/file-based JSON storage
- No external UI frameworks (custom CSS)
- Basic accessibility with proper labels and semantic HTML

### ✅ UI States
- Loading states for data fetching
- Empty states when no payments exist
- Error handling for invalid payment IDs
- Form validation and error messages

## Data Flow

1. **Payment Creation**: Form submission → Server Action → File write → Revalidate → Redirect
2. **Payment Updates**: Customer action → Server Action → File update → Revalidate → Redirect  
3. **Data Fetching**: Page load → Server Component → File read → Render
4. **Search/Filter**: URL params → Server Component → Filtered data → Render

## Key Technical Decisions

### Storage Choice
- **Decision**: Memory
- **Reasoning**: Simple, no database setup required, meets the requirement for in-memory/small JSON file
- **Trade-offs**: Not suitable for production, but perfect for this demo

### Server Actions vs API Routes
- **Decision**: Server Actions for all mutations
- **Reasoning**: Follows Next.js App Router best practices, simpler than API routes
- **Implementation**: Used `'use server'` directive with proper form handling

### ID Generation
- **Decision**: Math. random() to genrate random IDs 
- **Reasoning**: Secure, unique, follows payment industry patterns (`pay_xxx`)
- **Implementation**: Separate public IDs for customer links to avoid exposing system IDs

### Revalidation Strategy
- **Decision**: Targeted revalidation using `revalidatePath()`
- **Reasoning**: Ensures UI consistency after mutations without full page reloads
- **Implementation**: Revalidate home page and specific payment pages after updates

## Assumptions Made

1. **Single Currency**: Only EGP supported (as per requirements)
2. **No Authentication**: No user management or access control
3. **Simple Validation**: Basic form validation, no advanced business rules
4. **File Permissions**: Application has write access to create data directory
5. **Development Focus**: Optimized for local development, not production deployment
6. **Browser Support**: Modern browsers with JavaScript enabled

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: Base URL for payment links (defaults to `http://localhost:3000`) that changed based on env

## Parts Cut/Simplified

- **Tests**: No comprehensive test suite (bonus feature only)
- **Advanced Validation**: No idempotency checks or HMAC verification
- **Webhooks**: Not implemented (as per requirements)
- **Production Considerations**: No database, logging, monitoring, or error tracking
- **UI Polish**: Basic styling, no animations or advanced interactions
- **Mobile Optimization**: Responsive but not mobile-first design

## Future Improvements

If extending beyond the take-home scope:

1. **Database Integration**: Replace file storage with PostgreSQL/MongoDB
2. **Authentication**: Add merchant authentication and authorization
3. **Payment Gateway**: Integrate with real payment processors
4. **Advanced Search**: Full-text search, date range filters, pagination
5. **UI Enhancements**: Loading skeletons, toast notifications, better mobile UX
7. **Testing**: Unit tests, integration tests, E2E tests
8. **Monitoring**: Error tracking, analytics, performance monitoring
