# Technical Documentation

## Key Decisions

1. **In-Memory Storage**: Used simple in-memory array storage as specified in requirements. This is suitable for demo purposes but would need replacement with a proper database for production.

2. **Server Actions**: Implemented all data mutations using Next.js Server Actions instead of API routes, following the requirement specification.

3. **State Management**: Used React's useActionState for form submissions and status updates, providing pending states and error handling.

4. **URL Structure**: Followed the exact routing structure specified in the requirements document.

## Data Flow

1. **Reading Data**: Components directly import and call database functions for reading data.

2. **Writing Data**: Components use Server Actions which then call database functions and trigger revalidation.

3. **Revalidation**: Used `revalidatePath()` after mutations to ensure UI stays in sync with data changes.

## Assumptions

1. **No Authentication**: The application doesn't implement any authentication system as it wasn't required.

2. **Simple Error Handling**: Basic error handling implemented, but more robust solutions would be needed for production.

3. **Currency**: Assumed EGP as the only currency as specified in requirements.

4. **ID Format**: Used simple random ID generation with prefixes as specified.

## Limitations

1. **Data Persistence**: Data is lost on server restart due to in-memory storage.

2. **Scalability**: Current implementation isn't suitable for multiple users.

3. **Validation**: Minimal input validation implemented.
