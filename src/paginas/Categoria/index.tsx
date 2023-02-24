import { useQuery } from "@tanstack/react-query/build/lib/useQuery";
import { useParams } from "react-router-dom";
import ListaLivros from "../../componentes/ListaLivros";
import Loader from "../../componentes/Loader";
import TituloPrincipal from "../../componentes/TituloPrincipal"
import { obterCategoriaPorSlug } from "../../http";

const Categoria = () => {
    const params = useParams();

    //o segundo parametro do useQuery seria o equivalente ao array de dependencias do useEffect
    const { data: categoria, isLoading } = useQuery(['categoriaPorSlug', params.slug], () => obterCategoriaPorSlug(params.slug || ''));

    // useEffect(() => {
    //     setEstaCarregando(true);
    //     http.get<ICategoria[]>('categorias', {
    //         params: {
    //             slug: params.slug
    //         }
    //     }).then(resposta => {
    //         setCategoria(resposta.data[0])
    //         setEstaCarregando(false);
    //     })
    // },[params.slug]);
    //useQuery sendo usado no lugar desse useEffect

    if (isLoading) {
        return <Loader />
    }

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''}/>
            <ListaLivros categoria={categoria!} />
        </section>
    )
}

export default Categoria;