export const demoData=(n:number)=>{
    let a=[]
    for(let i =1;i<n;i++){
        a.push(i)
    }
    return a
}

export const items = [
    // this is the parent or 'item'
    {
      name: 'Fruits',
      id: 0,
      // these are the children or 'sub items'
      children: [
        {
          name: 'Apple',
          id: 10,
        },
        {
          name: 'Strawberry',
          id: 17,
        },
        {
          name: 'Pineapple',
          id: 13,
        },
        {
          name: 'Banana',
          id: 14,
        },
        {
          name: 'Watermelon',
          id: 15,
        },
        {
          name: 'Kiwi fruit',
          id: 16,
        },
      ],
    },
   
  
  ];