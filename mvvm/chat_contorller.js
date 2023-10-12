const dbConfig = require("../dbConfig");

const userDbName= "chat_history";
registerChat = async function (req, res) {
    const createDbAskQuestion = `
    CREATE TABLE ${userDbName} 
    (id INT AUTO_INCREMENT PRIMARY KEY,
      sender TEXT,
      user TEXT,
      message TEXT,
      sender_id TEXT,
      groupId TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    try {
        dbConfig.query(createDbAskQuestion, (error, results) => {
            if (error) {
                console.error('Error creating chat database:', error.message);
                res.status(500).json({ error: 'Error creating subjects database' });
            } else {
                console.log('user database created successfully!');
                res.status(200).json({ message: 'chat database created successfully' });
            }
        });
    } catch (err) {
        console.error("Error creating chat database:", err);
        res.status(500).json({
            "error": "An error occurred while creating the database"
        });
    }
};


const createPropoertyDetails = async function (req, res) {
  
  
    try {
    
        const showPer = `SELECT * FROM ${userDbName}`;
        
        dbConfig.query(showPer, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
          }
    
          if (result.length === 0) {
            return res.json({ "properties": "no properties" });
          }
    
          return res.json({ "properties": result });
        });
      } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Token is not valid' });
      }
  };

module.exports={
    registerChat,createPropoertyDetails,userDbName
}