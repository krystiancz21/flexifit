package com.flexifit.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {
    private Long id;
    private String name;
    private String description;
    private Integer durationInDays;
    private Double price;
    private String imageUrl;
    private String allowedEntries;
    private Status status;
}