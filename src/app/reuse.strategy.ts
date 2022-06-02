
 import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';



 interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
}
 
 export class CustomReuseStrategy implements RouteReuseStrategy {

    storedRoutes: { [key: string]: RouteStorageObject } = {};


    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
       return route.routeConfig!.path == ':city-name';
    }
   
    //Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        let storedRoute: RouteStorageObject = {
            snapshot: route,
            handle: handle
        };

        this.storedRoutes[route.routeConfig!.path!] = storedRoute;
    }
   
   //Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.storedRoutes[route.routeConfig!.path!];
    }
   
    //If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null{
        return this.storedRoutes[route.routeConfig!.path!];
    }
   
    //Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
       return future.routeConfig == curr.routeConfig;
    }
   }