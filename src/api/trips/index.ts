import { Router } from 'express';
import { isAuthenticated, hasRole } from '../../auth/auth.controller';
import { createTripHandler } from './trips.controller';
import { getAllTripsHandler } from './trips.controller';
import { getTripByIdHandler } from './trips.controller';
import { getTripsByUserIdHandler } from './trips.controller';
import { updateTripHandler } from './trips.controller';
import { deleteTripHandler } from './trips.controller';

const router = Router();

router.post('/', isAuthenticated, createTripHandler);

router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllTripsHandler);

router.get('/user-trips', isAuthenticated, getTripsByUserIdHandler);

router.get('/single', isAuthenticated, getTripByIdHandler);

router.patch('/single', isAuthenticated, updateTripHandler);

router.delete('/', isAuthenticated, deleteTripHandler);

export default router;