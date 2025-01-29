const express=require("express");
const app = express();
const port = process.env.PORT;

var user = [
    {
        name: "gagan",
        kidneys:['true','false']
    },
    {
        name: "blabla",
        kidneys:['true','true']
    }
];

app.use(express.json());

app.get("/",(req,res) => {
    const k=user[0].kidneys;
    var n= k.length;
    let h=0,u=0;
    for(let i=0;i<n;i++)
    {
        if(k[i]=='true')
            h++;
        else
            u++
    }
    res.json(
        {
            'number of kidneys':n,
            'number of healthy kidneys':h,
            'number of unhealthy kidneys':u
        }
    )
})

app.post("/",(req,res) => {
    const s=req.body.status;
    user[0].kidneys.push(s);
    res.json({
        msg : "Done!"
    })
})

app.put("/",(req,res) => {
    const k=user[0].kidneys;
    var n= k.length;
    let h=0,u=0;
    for(let i=0;i<n;i++)
    {
            k[i]='true';
    }
    res.json({
        msg : "Done!! All kidneys are healthy"
    })
})

app.delete("/",(req,res) => {
    const k=user[0].kidneys;
    var n= k.length;
    let h=0,u=0;
    for(let i=0;i<n;i++)
    {
        if(k[i]=='true')
            h++;
        else
            u++

            k[i]='true';
    }
    for(let i=h;i<n;i++)
        k.pop();
    res.json({
        msg:"all unhealthy kideneys removed!!"
    })
})

app.listen(port,()=> {
    console.log(`running on port = ${port}`);
})
