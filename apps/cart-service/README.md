# Cart Service

## Cart Merge Functionality

The cart service now supports merging guest carts with user carts when users log in. This is essential for e-commerce applications where users start shopping as guests and then decide to log in.

### API Endpoint

**POST** `/cart/merge`

Merges a guest cart (identified by session ID) with the authenticated user's cart.

#### Request Body

```json
{
  "guestSessionId": "session_id_of_guest_cart"
}
```

#### Authentication

This endpoint requires an authenticated user (JWT token or session).

#### Response

Returns the merged cart with all items from both the guest cart and the user's existing cart.

#### Merge Logic

1. **No guest cart exists**: Returns the user's existing cart or creates a new one
2. **No user cart exists**: Converts the guest cart to a user cart
3. **Both carts exist**:
   - Merges items from guest cart into user cart
   - If the same product exists in both carts, quantities are combined
   - If product only exists in guest cart, it's moved to user cart
   - Recalculates cart totals
   - Deletes the guest cart after successful merge

#### Example Usage

```javascript
// Frontend implementation example
const mergeGuestCart = async (guestSessionId) => {
  try {
    const response = await fetch('/cart/merge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        guestSessionId: guestSessionId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Cart merge failed:', error);
  }
};

// Call after successful login
await mergeGuestCart(localStorage.getItem('guestSessionId'));
localStorage.removeItem('guestSessionId'); // Clean up
```

#### Error Responses

- **401**: User must be authenticated
- **400**: Guest session ID is required
- **404**: Cart not found

### Other Endpoints

- **GET** `/cart` - Get current cart (guest or user)
- **PUT** `/cart/{id}` - Update cart
- **DELETE** `/cart/{id}` - Delete cart
