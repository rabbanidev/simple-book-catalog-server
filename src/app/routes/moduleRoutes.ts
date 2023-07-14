import { IRoute } from '../../interfaces/route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { FilterRoutes } from '../modules/filter/filter.route';

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
];

export default modulesRoutes;
