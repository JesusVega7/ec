// ----------------------------------------------------//
// This class helps to generate web requests to server //
// ----------------------------------------------------//
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QueryFactory  {
    // -------------------------------------------//
    // This method generate a search query object //
    // -------------------------------------------//
    public setSearchQuery(dataSearch: string, properties: string[]) {
        if (dataSearch) {
            if (typeof dataSearch === 'string') {
                dataSearch = dataSearch.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
            }
            const orObject = [];
            for (const property of properties) {
                orObject.push({
                    [property]: {
                        like: ('.*' + typeof dataSearch === 'string' ? dataSearch.trim() : dataSearch + '.*'),
                        options: 'i'
                    }
                });
            }
            return { or: orObject };
        }
        return {};
    }
    // ------------------------------------------//
    // This method generate an 'or' query object //
    // ------------------------------------------//
    public setOrQuery(property: string, values: any[]) {
        const orObject:any = [];
        values.forEach((value) => {
            orObject.push({
                [property]: value
            });
        });
        return { or: orObject };
    }
    // -------------------------------------------//
    // This method generate an and query object //
    // -------------------------------------------//
    public setAndQuery(properties: string[], values: any[]) {
        const andObject:any = [];
        values.forEach((value, index) => {
            andObject.push({
                [properties[index]]: value
            });
        });
        return { and: andObject };
    }
    // ------------------------------------------//
    // This method generate a complex 'or' query object //
    // ------------------------------------------//
    public setComplexOrQuery(objects: any[]) {
        return { or: objects };
    }
    // ------------------------------------------//
    // This method generate a complex 'or' query object //
    // ------------------------------------------//
    public setComplexAndQuery(objects: any[]) {
        return { and: objects };
    }
    // -------------------------------------------//
    // This method generate a where query object //
    // -------------------------------------------//
    public setWhereQuery(properties: string[], values: any[], searchObject: any) {
        const andObject = [];
        if (searchObject) {
            andObject.push(searchObject);
        }
        properties.forEach((property, index) => {
            if (values[index] !== '') {
                andObject.push({
                    [property]: values[index]
                });
            }
        });
        return { and: andObject };
    }
    // -----------------------------------------//
    // This method generate one sorter property //
    // -----------------------------------------//
    public setSorterProperty(sort: any) {
        if (sort) {
            if (sort.active && sort.direction) {
                return sort.active + ' ' + sort.direction.toUpperCase();
            }
            return 'createdAt DESC';
        }
        return 'createdAt DESC';
    }
    // -----------------------------------//
    // This method generate a GET request //
    // -----------------------------------//
    public generateGetQuery(model: string, whereObject: any, limit: number, skip: number, order: string, include: any[], fields?: any) {
        const query: any = {
            where: whereObject,
            limit: limit,
            skip: skip,
            order: order,
            include: include
        };
        if (fields && fields.length > 0) {
            query.fields = fields;
        }
        return (model 
            + JSON.stringify(query));
        // return (model + '?filter=' + JSON.stringify(query));
    }
    // -----------------------------------//
    // This method generate a simple GET request //
    // -----------------------------------//
    public generateSimpleGetQuery(model: string, whereObject: any) {
        return model + '?filter=' + JSON.stringify({
            where: whereObject
        });
    }
    // -----------------------------------//
    // This method generate a simple GET request //
    // -----------------------------------//
    public generateSimpleGetIncludeQuery(model: string, whereObject: any, include: any[]) {
        return model + '?filter=' + JSON.stringify({
            where: whereObject,
            include: include
        });
    }
    // ----------------------------------------------------------//
    // This method generate a GET request for calendar component //
    // ----------------------------------------------------------//
    public getCalendarQuery(model: string, startDate: string, endDate: string, branchId:any) {
        if (branchId) {

        }
        return model + '?filter=' + JSON.stringify({
            where: {
                or: [
                    {from: {between: [startDate, endDate]}},
                    {to: {between: [startDate, endDate]}}
                ]
            },
            include: 'appUser'
        });
    }
    // ------------------------------------------------------//
    // This method generate GET/COUNT request //
    // ------------------------------------------------------//
    public generateGetCountQuery(model: string, whereObject: any) {
        return model + '/count?where=' + JSON.stringify(whereObject);
    }
}
