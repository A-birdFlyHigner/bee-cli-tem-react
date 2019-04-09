const nums={};

nums.calculate={
  add: function(arg1,arg2){
  let r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  //return (arg1*m+arg2*m)/m;
  return Math.round(arg1*m+arg2*m)/m;
  },
  sub: function(arg1,arg2){
  let r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>=r2)?r1:r2;
  //return ((arg1*m-arg2*m)/m).toFixed(n);
  return (Math.round(arg1*m-arg2*m)/m).toFixed(n);
  },
  mul: function(arg1,arg2){
  let m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
  },
  div: function(arg1,arg2){
    let t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""));
    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
  }
};

Number.prototype.add = function (arg){
  return nums.calculate.add(arg,this);
}
Number.prototype.sub = function (arg){
  return nums.calculate.sub(this,arg);
}
Number.prototype.mul = function (arg){
  return nums.calculate.mul(arg, this);
}
Number.prototype.div = function (arg){
  return nums.calculate.div(this, arg);
}

export default nums