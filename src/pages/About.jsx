import Header from '../components/Header';
import './About.css'; // Importa o CSS específico para a página "About"

export default function About() {
    return (
        <>
            <Header />
            <div className="about-container">
                <h1 className="about-title">Sobre o Salão de Beleza do Senac</h1>
                <p className="about-text">
                    O salão de beleza do Senac é um espaço dedicado ao aprendizado prático e à excelência no cuidado com a beleza e o bem-estar. 
                    Localizado no campus da faculdade, o salão é gerenciado por profissionais qualificados e conta com a participação ativa de estudantes 
                    dos cursos de estética, cabeleireiro, manicure e maquiagem.
                </p>
                <p className="about-text">
                    Nosso objetivo é proporcionar um ambiente de prática real para os alunos, oferecendo serviços de alta qualidade ao público 
                    a preços acessíveis. Além disso, contribuímos para o desenvolvimento profissional dos nossos estudantes, preparando-os para 
                    o mercado de trabalho com experiências reais e supervisão constante.
                </p>
                <p className="about-text">
                    No salão do Senac, você encontrará uma variedade de serviços, incluindo cortes, penteados, coloração, tratamentos capilares, 
                    design de sobrancelhas, maquiagem e manicure. Tudo isso com um atendimento personalizado e com foco no bem-estar de nossos clientes.
                </p>
                <p className="about-highlight">
                    Horário de funcionamento: Segunda a sexta, das 9h às 18h.
                </p>
                <p className="about-highlight">
                    Endereço: Rua Exemplo, 123 - Centro, Sua Cidade.
                </p>
            </div>
        </>
    );
}
