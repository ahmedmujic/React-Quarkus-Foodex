package ba.codecta.foodex;

import java.util.List;

import ba.codecta.foodex.services.CategoryService;
import ba.codecta.foodex.services.CompanyService;
import ba.codecta.foodex.services.FoodService;
import ba.codecta.foodex.services.UserService;
import ba.codecta.foodex.services.model.*;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

@Path("/api")
@RequestScoped
public class MyResource {

    @Inject
    JsonWebToken jwt;

    @Inject
    UserService userService;

    @Inject
    FoodService foodService;

    @Inject
    CompanyService companyService;

    @Inject
    CategoryService categoryService;

    private String getResponseString(SecurityContext ctx) {
        String name;
        if (ctx.getUserPrincipal() == null) {
            name = "anonymous";
        } else if (!ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            throw new InternalServerErrorException("Principal and JsonWebToken names do not match");
        } else {
            name = ctx.getUserPrincipal().getName();
        }
        return String.format("hello + %s,"
                        + " isHttps: %s,"
                        + " authScheme: %s,"
                        + " hasJWT: %s",
                name, ctx.isSecure(), ctx.getAuthenticationScheme(), hasJwt());
    }

    private boolean hasJwt() {
        return jwt.getClaimNames() != null;
    }

    @POST
    @Path("/auth/register")
    @PermitAll
    @Consumes({MediaType.APPLICATION_JSON})
    public Response register(UserAuthDto userAuthDto) {
        try {
            boolean registrationResult = userService.register(userAuthDto);
            if (registrationResult) {
                return Response.ok().build();
            } else {
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/food/add/{id}/{categoryId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response addFood(FoodsDto foodsDto, @PathParam("id") Integer companyId, @PathParam("categoryId") Integer categoryId, @Context UriInfo uriInfo, @Context SecurityContext ctx) {
        System.out.println("uslo u problem");
        if (ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            try {
                System.out.println("proslo");
                boolean foodAdded = foodService.addFoodByCompanyId(foodsDto, companyId, categoryId );
                System.out.println(foodAdded);
                if (foodAdded) {
                    UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                    return Response.ok(uriBuilder.build()).entity(foodAdded).build();
                } else {
                    System.out.println("else problem");
                    return Response.status(Response.Status.BAD_REQUEST).build();
                }
            } catch (Exception e) {
                System.out.println(e);
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }

    @POST
    @Path("/companies/add")
    @RolesAllowed({"User"})
    @Consumes({MediaType.APPLICATION_JSON})
    public Response addCompany(CompanyDto companyDto, @Context UriInfo uriInfo, @Context SecurityContext ctx) {
        System.out.println("Principal: " + ctx.getUserPrincipal().getName() + "jwt: " + jwt.getName());
        if (ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            try {
                CompanyDto companyDto1 = companyService.addCompany(companyDto, jwt.getName());
                if (companyDto1 != null) {
                    UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                    return Response.ok(uriBuilder.build()).entity(companyDto1).build();
                } else {
                    return Response.status(Response.Status.BAD_REQUEST).build();
                }
            } catch (Exception e) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/companies/edit")
    @RolesAllowed({"User"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response handleHealAction(CompanyDto userAuthDto, @Context SecurityContext ctx) {
        if (ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            try {
                boolean result = companyService.editCompany(userAuthDto);
                if (result == false) {
                    return Response.status(Response.Status.BAD_REQUEST).build();
                }

                return Response.ok(result).build();

            } catch (Exception e) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/companies")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllFood(@Context UriInfo uriInfo, @Context SecurityContext ctx) {
        System.out.println("Principal: " + ctx.getUserPrincipal().getName() + "jwt: " + jwt.getName());
        if (ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            try {
                System.out.println("uslo");
                List<CompanyDto> allCompanies = companyService.getAllCompaniesByUserEmail(jwt.getName());

                if (allCompanies != null) {

                    UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                    return Response.ok(uriBuilder.build()).entity(allCompanies).build();
                } else {
                    System.out.println("uslo3");
                    return Response.status(Response.Status.BAD_REQUEST).build();
                }
            } catch (Exception e) {
                System.out.println(e);
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
    @GET
    @Path("/company/{id}")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCompanyInfo(@Context UriInfo uriInfo,@PathParam("id") Integer companyId, @Context SecurityContext ctx) {

            try {

                CompanyDto company = companyService.getCompanyByCompanyId(companyId);

                if (company != null) {

                    UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                    return Response.ok(uriBuilder.build()).entity(company).build();
                } else {

                    return Response.status(Response.Status.BAD_REQUEST).build();
                }
            } catch (Exception e) {
                System.out.println(e);
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

    }

    @GET
    @Path("/companies-all")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCompanies(@Context UriInfo uriInfo) {
        try {

            List<CompanyDto> allCompanies = companyService.getAllCompanies();
            if (allCompanies != null) {

                UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                return Response.ok(uriBuilder.build()).entity(allCompanies).build();
            } else {
                System.out.println("uslo3");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }
    @GET
    @Path("/categories")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCategories(@Context UriInfo uriInfo) {
        try {

            List<CategoryDto> allCategories = categoryService.listAllCategories();
            if (allCategories != null) {

                UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                return Response.ok(uriBuilder.build()).entity(allCategories).build();
            } else {
                System.out.println("uslo3");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @GET
    @Path("/food-categories")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllFoodCategories(@Context UriInfo uriInfo) {
        try {

            List<CategoryDto> allCategories = foodService.getAllFoodCategories();
            if (allCategories != null) {

                UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                return Response.ok(uriBuilder.build()).entity(allCategories).build();
            } else {
                System.out.println("uslo3");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/auth/login")
    @PermitAll
    @Consumes({MediaType.APPLICATION_JSON})
    public Response login(UserAuthDto userAuthDto, @Context UriInfo uriInfo) {
        try {
            UserDto loginResult = userService.login(userAuthDto);

            if (loginResult != null) {
                UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();
                uriBuilder.path(Long.toString(loginResult.getId()));
                return Response.ok(uriBuilder.build()).entity(loginResult).build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }


}