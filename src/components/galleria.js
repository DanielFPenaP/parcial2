import { useState } from 'react';
import {Container,Row,Col, Card, Table} from 'react-bootstrap'
function Galleria()
{
    var [elements,setElements]= useState([]);
    var [rooms,setRooms] = useState([])
    const URL = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
    fetch(URL).then(res => res.json()).then(data => {
        setElements(data)
    })
    const URL2 = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"
    fetch(URL2).then(res=>res.json()).then(data => {
        setRooms(data)        
    })
    var [detail,setDetail] = useState([]);
    function handleClick(element)
    {
        var source;
        detail = (<> </>)
        setTable([])
        rooms.forEach(e=>{
            switch(e.name){
                case "Living room":
                    source = "https://previews.123rf.com/images/bsd555/bsd5552003/bsd555200300531/142199607-apartment-interior-rgb-color-icon-living-room-furniture-cosy-home-couch-sofa-place-for-rest-and-rela.jpg";
                    break;
                case "Kitchen":
                    source="https://icons.veryicon.com/png/o/food--drinks/kitchenware-1/kitchen-8.png"
                    break;
                case "Dinner room":
                    source="https://cdn-icons-png.flaticon.com/512/925/925620.png"
                    break;
                default:
                    source = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg1VvYctAK78qwYCqST7q6XMl4Y78C30d_A&usqp=CAU"
                    break;
            }
        
            if(e.homeId===element.id)
            {
                detail = (
                    <>
                    {detail}
                    <Col>    
                    <Card onClick={()=>handleClickDetail(e.devices)}>
                        <Card.Img variant="top" src = {source}/>
                        <Card.Body>
                            <Card.Title>
                                {e.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    </Col>
                    </>)
                    setDetail(detail,[])
            }
            }
        )
    }
    var [table,setTable] = useState([])
    function handleClickDetail(list)
    {
        var count = 0;
        table = (
            <Col>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Device</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        list.map(e => {
                            return (
                                <tr>
                                    <td>{count++}</td>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.desired.value+" "+e.desired.unit}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        )
        setTable(table,[])
    }
    return (    
        <Container>
            <Row>
            {elements.map(e => {
                var source;
                if(e.type === "house")
                {
                    source = "https://cdn-icons-png.flaticon.com/512/1670/1670080.png"
                }
                else
                {
                    source = "https://cdn.icon-icons.com/icons2/1706/PNG/512/3986698-appartment-plan-scheme-icon_112263.png"
                }
                return (
                <Col>    
                <Card onClick={()=>handleClick(e)}>
                    <Card.Img variant="top" src = {source}/>
                    <Card.Body>
                        <Card.Title>
                            {e.name}
                        </Card.Title>
                        <Card.Text>
                            {e.address}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>)
            })} 
            </Row>
            <Row id="detail">
                {detail}
                {table}
            </Row>
            
        </Container>
    )
}
export default Galleria