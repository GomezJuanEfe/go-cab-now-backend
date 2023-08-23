import { Router } from 'express';
import { isAuthenticated, hasRole } from '../../auth/auth.controller';
import { createTripHandler } from './trips.controller';
import { getAllTripsHandler } from './trips.controller';

const router = Router();


// CREATE
// /api/trips -> POST
router.post('/', isAuthenticated, createTripHandler);

// READ
// /api/trips -> GET
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllTripsHandler);

// /api/trips/single -> GET
//router.get('/single', isAuthenticated, getTripsByUserIdHandler);

// UPDATE
// /api/trip/single -> PATCH
//router.patch('/single', isAuthenticated, updateTripHandler);

// DELETE
// /api/trip -> DELETE
//router.delete('/', isAuthenticated, deleteTripHandler);


export default router;