/**
 * Created by Torgeir on 13.02.2016.
 */

var countryCodes = {
    getCountryCodes: function(db, callback) {
        var collection = db.get('countryCodes');
        collection.find({}, {}, callback);
    }
    
};
export default countryCodes;