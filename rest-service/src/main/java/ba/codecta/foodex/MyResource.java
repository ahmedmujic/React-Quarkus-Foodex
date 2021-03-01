package ba.codecta.foodex;

import java.util.List;

import ba.codecta.foodex.services.CompanyService;
import ba.codecta.foodex.services.FoodService;
import ba.codecta.foodex.services.UserService;
import ba.codecta.foodex.services.model.CompanyDto;
import ba.codecta.foodex.services.model.FoodsDto;
import ba.codecta.foodex.services.model.UserAuthDto;
import ba.codecta.foodex.services.model.UserDto;
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
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/food/add/{id}")
    @PermitAll
    @Consumes({MediaType.APPLICATION_JSON})
    public Response addCompany(FoodsDto foodsDto, @PathParam("id") Long companyId, @Context UriInfo uriInfo) {
        try {
            boolean foodAdded = foodService.addFoodByCompanyId(foodsDto, companyId);
            if (foodAdded) {
                UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();

                return Response.ok(uriBuilder.build()).entity(foodAdded).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
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
    public Response getAllFood(@Context UriInfo uriInfo) {
        try {
            System.out.println("uslo");
            List<CompanyDto> allCompanies = companyService.getAllCompanies();
            System.out.println(allCompanies.get(0).getCompanyName());
            if (allCompanies != null) {
                System.out.println("uslo2");
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
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }


}