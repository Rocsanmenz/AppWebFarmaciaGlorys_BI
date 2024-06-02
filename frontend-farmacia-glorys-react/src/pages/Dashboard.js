import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import '../styles/App.css';  

function Dashboard({ Rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

    const imprimirGraficos = () => {
        console.log("Imprimiendo estadísticas...");
    }

    return(
        <div>
        <Header Rol={ Rol } />  

        <Container className="margen-conten" responsive>

            <Row className="g-3">
            
            <Col sm="12" md="12" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title>Dashboard</Card.Title>

                    <iframe title="REPORTE KARDEX" width="1024" height="804" src="https://app.powerbi.com/view?r=eyJrIjoiYzJhY2RhOTEtMGIzNy00ZjE2LWFlZGYtZTVmOThjNjY0Yzk2IiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>

                    <Button onClick={imprimirGraficos}>
                    Generar reporte con imagen
                    </Button>
                </Card.Body>
                </Card>
            </Col>

            </Row>
        </Container>

        </div>
    );
}

  export default Dashboard; // Exporta el componente Estadisticas para su uso en otras partes de la aplicación  