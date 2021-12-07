import { formatMessage } from '@formatjs/intl';
import { useEffect, useState } from 'react';
import {Container,Row,Col, Card, Table} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import PieChart from './pieChart';
function Galleria()
{
    const [elements,setElements]= useState([]);
    const [rooms,setRooms] = useState([])
    useEffect(()=>{
        if(!navigator.onLine)
        {
            if(localStorage.getItem("elements")===null) SetCard((<h1>No hay datos en cache</h1>))
            else setElements(JSON.parse(localStorage.getItem("elements")))
        }
        else
        {const URL = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
        fetch(URL).then(res => res.json()).then(data => {
            setElements(data)
            localStorage.setItem("elements",JSON.stringify(data))
        })}
    },[])
    useEffect(()=>{
        if(!navigator.onLine)
        {
            if(localStorage.getItem("rooms")===null) SetCard((<h1>No hay datos en cache</h1>))
            else setRooms(JSON.parse(localStorage.getItem("rooms")))
        }
        else
        {const URL2 = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"
        fetch(URL2).then(res=>res.json()).then(data => {
            setRooms(data)
            localStorage.setItem("rooms",JSON.stringify(data))  
        })}
    },[])
    const [detail,setDetail] = useState((<></>));
    const [table,setTable] = useState((<></>))
    const [card, SetCard] = useState((<></>))
    const [grafico,setGrafico] = useState((<></>))
    useEffect(()=>{
        if(elements===null||rooms===null)
        {
            SetCard((<h1>No hay datos en cache</h1>))
            return
        }

        var code = (
            <>
            {elements.map(element => {
            var source;
            if(element.type === "house")
            {
                source = "https://cdn-icons-png.flaticon.com/512/1670/1670080.png"
            }
            else
            {
                source = "https://cdn.icon-icons.com/icons2/1706/PNG/512/3986698-appartment-plan-scheme-icon_112263.png"
            }
            return (
            <Col>    
            <Card onClick={()=>{
                
                var source;
                setTable([])
                var d;
                var idMessage;
                var data=[];
                rooms.forEach(e=>{
                    switch(e.name){
                        case "Living room":
                            source = "https://previews.123rf.com/images/bsd555/bsd5552003/bsd555200300531/142199607-apartment-interior-rgb-color-icon-living-room-furniture-cosy-home-couch-sofa-place-for-rest-and-rela.jpg";
                            idMessage="Living room"
                            break;
                        case "Kitchen":
                            source="https://icons.veryicon.com/png/o/food--drinks/kitchenware-1/kitchen-8.png"
                            idMessage="Kitchen"
                            break;
                        case "Dinner room":
                            source="https://cdn-icons-png.flaticon.com/512/925/925620.png"
                            idMessage="Dinner room"
                            break;
                        default:
                            source = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg1VvYctAK78qwYCqST7q6XMl4Y78C30d_A&usqp=CAU"
                            idMessage="Room"
                            break;
                    }
                
                    if(e.homeId===element.id)
                    {
                        data = data.concat([e]);
                        d = (
                            <>
                            {d}
                            <Col>    
                            <Card onClick={()=>{
                                 var count = 1;
                                 var t = (
                                     <Col>
                                         <Table responsive>
                                             <thead>
                                                 <tr>
                                                     <th>#</th>
                                                     <th>ID</th>
                                                     <th><FormattedMessage id="devices"/></th>
                                                     <th><FormattedMessage id="value"/></th>
                                                 </tr>
                                             </thead>
                                             <tbody>
                                                 {
                                                 e.devices.map(device => {
                                                     return (
                                                         <tr>
                                                             <td>{count++}</td>
                                                             <td>{device.id}</td>
                                                             <td>{device.name}</td>
                                                             <td>{device.desired.value+" "+device.desired.unit}</td>
                                                         </tr>
                                                     )
                                                 })}
                                             </tbody>
                                         </Table>
                                     </Col>
                                 )
                                 setTable(t);
                            }}>
                                <Card.Img variant="top" src = {source}/>
                                <Card.Body>
                                    <Card.Title>
                                        <FormattedMessage id={idMessage}/>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            </Col>
                            </>)
                    }
                    }
                )
                setDetail(d);
                var char = [];
                data.forEach(e=>{
                    char = char.concat([{ label: e.name, value: e.powerUsage.value }])
                })
                setGrafico((
                    <PieChart props={char}/>
                ))
            }}>
                <Card.Img variant="top" src = {source}/>
                <Card.Body>
                    <Card.Title>
                        {element.name}
                    </Card.Title>
                    <Card.Text>
                        {element.address}
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>)
        })} 
            </>
        )
        SetCard(code)
    },[elements,rooms])
    return (    
        <Container>
            <Row>
                {card}
            </Row>
            <Row id="detail">
                {detail}
                {table}
            </Row>
            <Row id="canvas">
                {grafico}
            </Row>
            
        </Container>
    )
}
export default Galleria