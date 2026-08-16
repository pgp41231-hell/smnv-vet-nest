# VetNest interactive demo

A synchronized two-interface product demo for a veterinary care marketplace. The pet parent can find a veterinarian and request a video consultation; the veterinarian receives the request, accepts it, and starts the consultation; the pet parent is notified in real time.

The customer app also includes a unified marketplace of 11 home-care services and diagnostic tests. Each booking assigns a verified professional and creates a detailed, trackable job page.

## Run locally

```bash
npm install
npm run dev
```

## Demo flow

1. On the pet parent phone, select a veterinarian.
2. Choose a date, time, and consultation reason, then book.
3. On the veterinarian phone, accept the incoming request.
4. Start the consultation to trigger the pet parent’s join prompt.

For the services flow, choose **View all**, select any service or diagnostic test, confirm a slot, and open the assigned professional’s job page.

Use **Reset demo** between the two phones to return to the initial state.
