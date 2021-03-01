package ba.codecta.foodex.jwt;

import ba.codecta.foodex.repository.entity.UserEntity;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.annotations.QuarkusMain;
import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.jwt.Claims;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;


public class TokenGenerator {

    public static String generateJwtTokenWithUserInfo(UserEntity user, List<String> roles){
        return Jwt.issuer("http://localhost:8080")
                .upn(user.getEmail())
                .groups(new HashSet<>(roles))
                .claim("id",user.getId())
                .claim("name", user.getName())
                .sign();

    }
}
