"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const filter_route_1 = require("../modules/filter/filter.route");
const readingList_route_1 = require("../modules/readingList/readingList.route");
const review_route_1 = require("../modules/review/review.route");
const user_route_1 = require("../modules/user/user.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const modulesRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/filters',
        route: filter_route_1.FilterRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.WishListRoutes,
    },
    {
        path: '/reading-list',
        route: readingList_route_1.ReadingListRoutes,
    },
];
exports.default = modulesRoutes;
