const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // 导入cors中间件
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // 使用cors中间件

const config = {
  user: 'sa',
  password: '455273973',
  server: '127.0.0.1',
  database: 'TV_Manage_System',
  options: {
    enableArithAbort: true,
    encrypt: false,
    connectTimeout: 30000
  }
};

sql.connect(config, function(err) {
  if (err) {
    console.log("连接失败:", err);
    return;
  }
  console.log("成功连接到SQL Server 2000...");
});

// 获取所有员工
app.get('/api/employees', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Employee', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching employees');
    } else {
      res.json(result.recordset);
    }
  });
});

// 添加新员工
app.post('/api/employees', (req, res) => {
  const { Name, Position, Department, Phone, Email } = req.body;
  const request = new sql.Request();
  request.query(`INSERT INTO Employee (Name, Position, Department, Phone, Email) VALUES ('${Name}', '${Position}', '${Department}', '${Phone}', '${Email}')`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding employee');
    } else {
      res.status(201).send('Employee added');
    }
  });
});

// 更新员工信息
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { Name, Position, Department, Phone, Email } = req.body;
  const request = new sql.Request();
  request.query(`UPDATE Employee SET Name='${Name}', Position='${Position}', Department='${Department}', Phone='${Phone}', Email='${Email}' WHERE EmployeeID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating employee');
    } else {
      res.send('Employee updated');
    }
  });
});

// 删除员工
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  request.query(`DELETE FROM Employee WHERE EmployeeID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting employee');
    } else {
      res.send('Employee deleted');
    }
  });
});

// 获取所有频道
app.get('/api/channels', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Channel', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching channels');
    } else {
      res.json(result.recordset);
    }
  });
});

// 添加新频道
app.post('/api/channels', (req, res) => {
  const { ChannelName, HostID } = req.body;
  const request = new sql.Request();
  request.query(`INSERT INTO Channel (ChannelName, HostID) VALUES ('${ChannelName}', ${HostID})`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding channel');
    } else {
      res.status(201).send('Channel added');
    }
  });
});

// 更新频道信息
app.put('/api/channels/:id', (req, res) => {
  const { id } = req.params;
  const { ChannelName, HostID } = req.body;
  const request = new sql.Request();
  request.query(`UPDATE Channel SET ChannelName='${ChannelName}', HostID=${HostID} WHERE ChannelID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating channel');
    } else {
      res.send('Channel updated');
    }
  });
});

// 删除频道
app.delete('/api/channels/:id', (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  request.query(`DELETE FROM Channel WHERE ChannelID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting channel');
    } else {
      res.send('Channel deleted');
    }
  });
});

// 获取所有广告
app.get('/api/advertisements', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Advertisement', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching advertisements');
    } else {
      res.json(result.recordset);
    }
  });
});

// 添加新广告
app.post('/api/advertisements', (req, res) => {
  const { AdName, EditorID } = req.body;
  const request = new sql.Request();
  request.query(`INSERT INTO Advertisement (AdName, EditorID) VALUES ('${AdName}', ${EditorID})`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding advertisement');
    } else {
      res.status(201).send('Advertisement added');
    }
  });
});

// 更新广告信息
app.put('/api/advertisements/:id', (req, res) => {
  const { id } = req.params;
  const { AdName, EditorID } = req.body;
  const request = new sql.Request();
  request.query(`UPDATE Advertisement SET AdName='${AdName}', EditorID=${EditorID} WHERE AdID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating advertisement');
    } else {
      res.send('Advertisement updated');
    }
  });
});

// 删除广告
app.delete('/api/advertisements/:id', (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  request.query(`DELETE FROM Advertisement WHERE AdID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting advertisement');
    } else {
      res.send('Advertisement deleted');
    }
  });
});

// 获取所有演播室
app.get('/api/studios', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Studio', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching studios');
    } else {
      res.json(result.recordset);
    }
  });
});

// 添加新演播室
app.post('/api/studios', (req, res) => {
  const { StudioName, Location } = req.body;
  const request = new sql.Request();
  request.query(`INSERT INTO Studio (StudioName, Location) VALUES ('${StudioName}', '${Location}')`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding studio');
    } else {
      res.status(201).send('Studio added');
    }
  });
});

// 更新演播室信息
app.put('/api/studios/:id', (req, res) => {
  const { id } = req.params;
  const { StudioName, Location } = req.body;
  const request = new sql.Request();
  request.query(`UPDATE Studio SET StudioName='${StudioName}', Location='${Location}' WHERE StudioID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating studio');
    } else {
      res.send('Studio updated');
    }
  });
});

// 删除演播室
app.delete('/api/studios/:id', (req, res) => {
  const { id } = req.params;
  const request = new sql.Request();
  request.query(`DELETE FROM Studio WHERE StudioID=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting studio');
    } else {
      res.send('Studio deleted');
    }
  });
});

// 获取所有频道广告
app.get('/api/channel-ads', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Channel_Ad', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching channel ads');
    } else {
      res.json(result.recordset);
    }
  });
});

// 添加新频道广告
app.post('/api/channel-ads', (req, res) => {
    const { ChannelID, AdID } = req.body;
    const request = new sql.Request();
    request.query(`INSERT INTO Channel_Ad (ChannelID, AdID) VALUES (${ChannelID}, ${AdID})`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error adding channel ad');
      } else {
        res.status(201).send('Channel ad added');
      }
    });
  });
  
  // 更新频道广告信息
  app.put('/api/channel-ads/:id', (req, res) => {
    const { id } = req.params;
    const { ChannelID, AdID } = req.body;
    const request = new sql.Request();
    request.query(`UPDATE Channel_Ad SET ChannelID=${ChannelID}, AdID=${AdID} WHERE ChannelAdID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating channel ad');
      } else {
        res.send('Channel ad updated');
      }
    });
  });
  
  // 删除频道广告
  app.delete('/api/channel-ads/:id', (req, res) => {
    const { id } = req.params;
    const request = new sql.Request();
    request.query(`DELETE FROM Channel_Ad WHERE ChannelAdID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting channel ad');
      } else {
        res.send('Channel ad deleted');
      }
    });
  });
  
  // 获取所有频道演播室
  app.get('/api/channel-studios', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM Channel_Studio', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching channel studios');
      } else {
        res.json(result.recordset);
      }
    });
  });
  
  // 添加新频道演播室
  app.post('/api/channel-studios', (req, res) => {
    const { ChannelID, StudioID } = req.body;
    const request = new sql.Request();
    request.query(`INSERT INTO Channel_Studio (ChannelID, StudioID) VALUES (${ChannelID}, ${StudioID})`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error adding channel studio');
      } else {
        res.status(201).send('Channel studio added');
      }
    });
  });
  
  // 更新频道演播室信息
  app.put('/api/channel-studios/:id', (req, res) => {
    const { id } = req.params;
    const { ChannelID, StudioID } = req.body;
    const request = new sql.Request();
    request.query(`UPDATE Channel_Studio SET ChannelID=${ChannelID}, StudioID=${StudioID} WHERE ChannelStudioID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating channel studio');
      } else {
        res.send('Channel studio updated');
      }
    });
  });
  
  // 删除频道演播室
  app.delete('/api/channel-studios/:id', (req, res) => {
    const { id } = req.params;
    const request = new sql.Request();
    request.query(`DELETE FROM Channel_Studio WHERE ChannelStudioID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting channel studio');
      } else {
        res.send('Channel studio deleted');
      }
    });
  });
  
  // 获取所有频道员工
  app.get('/api/channel-staffs', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM Channel_Staff', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching channel staffs');
      } else {
        res.json(result.recordset);
      }
    });
  });
  
  // 添加新频道员工
  app.post('/api/channel-staffs', (req, res) => {
    const { ChannelID, EmployeeID } = req.body;
    const request = new sql.Request();
    request.query(`INSERT INTO Channel_Staff (ChannelID, EmployeeID) VALUES (${ChannelID}, ${EmployeeID})`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error adding channel staff');
      } else {
        res.status(201).send('Channel staff added');
      }
    });
  });
  
  // 更新频道员工信息
  app.put('/api/channel-staffs/:id', (req, res) => {
    const { id } = req.params;
    const { ChannelID, EmployeeID } = req.body;
    const request = new sql.Request();
    request.query(`UPDATE Channel_Staff SET ChannelID=${ChannelID}, EmployeeID=${EmployeeID} WHERE ChannelStaffID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating channel staff');
      } else {
        res.send('Channel staff updated');
      }
    });
  });
  
  // 删除频道员工
  app.delete('/api/channel-staffs/:id', (req, res) => {
    const { id } = req.params;
    const request = new sql.Request();
    request.query(`DELETE FROM Channel_Staff WHERE ChannelStaffID=${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting channel staff');
      } else {
        res.send('Channel staff deleted');
      }
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  