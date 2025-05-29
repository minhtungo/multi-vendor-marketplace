import { formatPrice } from '@repo/shared/utils';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Heading } from '@repo/ui/components/heading';
import { Separator } from '@repo/ui/components/separator';
import { Minus, Plus, ShoppingBag, Trash2 } from '@repo/ui/icons';
import Image from 'next/image';
import Link from 'next/link';

const cartItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    quantity: 1,
    image: '/placeholder.svg?height=120&width=120',
    color: 'Black',
    size: 'One Size',
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    price: 39.99,
    quantity: 2,
    image: '/placeholder.svg?height=120&width=120',
    color: 'Navy Blue',
    size: 'Large',
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    price: 89.99,
    quantity: 1,
    image: '/placeholder.svg?height=120&width=120',
    color: 'Brown',
    size: 'Medium',
  },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = 9.99;
const tax = subtotal * 0.08;
const total = subtotal + shipping + tax;

export function CartTemplate() {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 mb-8'>
        <ShoppingBag className='h-6 w-6' />
        <Heading variant='h5' as='h1'>
          Shopping Cart
        </Heading>
        <span className='text-sm text-muted-foreground'>({cartItems.length} items)</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <Card>
            <CardContent>
              {cartItems.map((item, index) => (
                <div key={`cart-item-${item.id}`}>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={120}
                        height={120}
                        className='rounded-lg object-cover'
                      />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 justify-between'>
                        <Heading variant='h5' as='h3'>
                          {item.name}
                        </Heading>
                        <p className='text-lg font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className='flex items-center justify-between mt-4'>
                        <div className='flex items-center gap-3'>
                          <Button variant='outline' size='icon' className='h-8 w-8'>
                            <Minus className='h-4 w-4' />
                          </Button>
                          <span className='text-sm font-medium w-8 text-center'>{item.quantity}</span>
                          <Button variant='outline' size='icon' className='h-8 w-8'>
                            <Plus className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='flex items-center gap-4'>
                          <Button variant='ghost' size='icon'>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && <Separator className='my-6' />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <Card className='sticky top-8'>
            <CardContent>
              <Heading variant='h5' as='h3' className='mb-4'>
                Order Summary
              </Heading>

              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span className='font-medium'>{formatPrice(subtotal)}</span>
                </div>

                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='font-medium'>{formatPrice(shipping)}</span>
                </div>

                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span className='font-medium'>{formatPrice(tax)}</span>
                </div>

                <Separator />

                <div className='flex justify-between text-base font-semibold'>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button className='w-full mt-6' size='lg' asChild>
                <Link href='/checkout'>Proceed to Checkout</Link>
              </Button>

              <Button variant='outline' className='w-full mt-3' asChild>
                <Link href='/'>Continue Shopping</Link>
              </Button>

              <div className='mt-6 text-center'>
                <p className='text-xs text-muted-foreground'>Free shipping on orders over $75</p>
                <p className='text-xs text-muted-foreground mt-1'>30-day return policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
