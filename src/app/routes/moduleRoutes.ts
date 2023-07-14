import { IRoute } from '../../interfaces/route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { FilterRoutes } from '../modules/filter/filter.route';
import { ReviewRoutes } from '../modules/review/review.route';

const modulesRoutes: IRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/filters',
    route: FilterRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

export default modulesRoutes;
