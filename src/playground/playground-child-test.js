export default function PlaygroundChild(){
    const list = []
    for(let i = 0; i < 100; i++){
        list.push(<li key={i} className="custom-li">Hello World</li>)
    }
    return <div className="custom-row">
        <div className="custom-col">
            <ul>
                {list}
            </ul>
        </div>
        <div className="custom-col">
            <h1>Hi Mom</h1>
        </div>
    </div>
}
