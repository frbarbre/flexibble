// import { ProjectInterface } from "@/common.types";
// import Categories from "@/components/Categories";
// import LoadMore from "@/components/LoadMore";
// import ProjectCard from "@/components/ProjectCard";
// import { fetchAllProjects } from "@/lib/actions";

// type ProjectSearch = {
//   projectSearch: {
//     edges: { node: ProjectInterface }[];
//     pageInfo: {
//       hasPreviousPage: boolean;
//       hasNextPage: boolean;
//       startCursor: string;
//       endCursor: string;
//     };
//   };
// };

// type SearchParams = {
//   category?: string | null;
//   endcursor?: string | null;
// };

// type Props = {
//   searchParams: SearchParams;
// };

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const revalidate = 0;

// export default async function Home({
//   searchParams: { category, endcursor },
// }: Props) {
//   const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;
//   const projectsToDisplay = data?.projectSearch?.edges || [];

//   if (projectsToDisplay.length === 0) {
//     return (
//       <section className="flexStart flex-col paddings">
//         <Categories />
//         <p className="no-result-text text-center">
//           No projects found, go create some first
//         </p>
//       </section>
//     );
//   }

//   const pagination = data?.projectSearch?.pageInfo;

//   return (
//     <section className="flex-start flex-col paddings mb-16">
//       <Categories />
//       <section className="projects-grid">
//         {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
//           <ProjectCard
//             key={node?.id}
//             id={node?.id}
//             image={node?.image}
//             title={node?.title}
//             name={node?.createdBy?.name}
//             avatarUrl={node?.createdBy?.avatarUrl}
//             userId={node?.createdBy?.id}
//           />
//         ))}
//       </section>
//       <LoadMore
//         startCursor={pagination?.startCursor}
//         endCursor={pagination?.endCursor}
//         hasPreviousPage={pagination?.hasPreviousPage}
//         hasNextPage={pagination?.hasNextPage}
//       />
//     </section>
//   );
// }

import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {

  const currentCatagory = category || "all"

  const data = (await fetchAllProjects(currentCatagory, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges.sort(function(a,b) {
    if(a.node?.updatedAt > b.node?.updatedAt) {
      return -1
    }
    if(a.node?.updatedAt < b.node?.updatedAt) {
      return 1
    }
    return 0
  }) || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }, index: number) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
            index={index}
          />
        ))}
      </section>

      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo?.hasNextPage}
      />
    </section>
  );
};

export default Home;
