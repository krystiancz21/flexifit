package com.flexifit.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$", message = "First name must contain only letters")
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+([ '-][A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)*$", message = "Last name must contain only letters, and may include spaces or hyphens")
    private String lastname;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 4, message = "Password should be at least 8 characters")
//    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.*\\d).+$", message = "Password must contain at least one uppercase letter, one special character, and one digit")
    private String password;

//    private Role role;
}
