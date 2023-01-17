
async function load() {
    const data = await new Promise(resolve => {{
        setTimeout(() => 
          // console.log("Hhehe");
          resolve([1, 2, 3]), 10);
        console.log("Hhehe");
    }
    // await яг өөрийнхөө үйлдлийг бол хийсэн байна харин тэрний дараагийн then этрийг бол үлдээгээд явсан байна. Тэгээд үргэлжлүүлээд дуудсан газраа эргэж ирээд дараагийн үйлдлүүдийг ажиллуулсан байна. 
    }).then(data => {
        console.log("hihi");
        return data.map(i => i * 10)
    });
    // await байгаа болохоор дараагийн үйлдэл рүү гээ орохгүй байгаа юм болов уу? 
    console.log(`Data inside the function: ${JSON.stringify(data)}`);
    return data;
}
  
function main() {
    const data = load();
    console.log(`Loaded data: ${JSON.stringify(data)}`);
    setTimeout(()=>{
        console.log(`Data after 1000ms`);
    }, 5);
        
}

main();