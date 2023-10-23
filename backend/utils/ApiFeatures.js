import { application } from "express";

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;      // The MongoDB query
        this.queryStr = queryStr; // The query string from the URL
    }

    //SEARCH FOR SPECIFIC HOTEL
    search() {
        const keyword = this.queryStr.keyword
            ?//if keyword found
           
            {   
                hotelName: {
                    $regex: this.queryStr.keyword,
                    $options: "i" //case insensitive
                }

            } : {}
           
        this.query = this.query.find({ ...keyword });
        return this
    }

    filter() {
        // Create a shallow copy of the queryStr object using {...}
        const queryStrCopy = { ...this.queryStr }

        // Define an array of fields to be removed from the copied queryStr
        const removeFields = ["keyword", "page", "limit"];

        // Iterate over the removeFields array and delete corresponding fields from the copied queryStr
        removeFields.forEach((key) => delete queryStrCopy[key]);

        // Convert the modified queryStrCopy object into a string
        let queryStr = JSON.stringify(queryStrCopy);

        // Replace gt, gte, lt, lte with $gt, $gte, $lt, $lte from the string using a regular expression
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => '$' + key);

        // Parse the modified string back into a JSON object
        this.query = this.query.find(JSON.parse(queryStr));

        // Update the query property of the current object with the modified query
        return this;

    }

} export default ApiFeatures;

// use in productController
//http://localhost/hotels?keyword=Blossom
//anything after ? is query and laptop is quervyStr