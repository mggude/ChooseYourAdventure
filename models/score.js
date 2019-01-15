module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate:{
            //     len:[2,3]
            // }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Score;
}