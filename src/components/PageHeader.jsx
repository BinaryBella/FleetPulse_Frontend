/* eslint-disable react/prop-types */
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";

export default function PageHeader(props) {
     return (
         <div>
             <p className="font-sans text-4xl text-[#393970] mb-7">{props.title}</p>

             {props.breadcrumbs && <Breadcrumb
                 spacing='15px'
                 className="font-small text-lg text-gray-500  mb-7"
                 separator={<ChevronRightIcon color='gray.500'/>}
             >
                 {props.breadcrumbs.map((breadcrumb, index) => (
                     <BreadcrumbItem key={index} className={breadcrumb.isReversed ? "flex flex-row-reverse" : ""}>
                         <BreadcrumbLink href={breadcrumb.link}>{breadcrumb.label}</BreadcrumbLink>
                     </BreadcrumbItem>
                 ))}
             </Breadcrumb>}
         </div>
     );
}
