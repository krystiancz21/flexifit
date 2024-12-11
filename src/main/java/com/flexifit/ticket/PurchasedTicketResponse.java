package com.flexifit.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchasedTicketResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private LocalDateTime purchaseDate;
    private LocalDateTime expirationDate;
} 