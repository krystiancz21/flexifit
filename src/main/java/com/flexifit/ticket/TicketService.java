package com.flexifit.ticket;

import com.flexifit.user.User;
import com.flexifit.user.UserRepository;
import com.flexifit.userticket.UserTicket;
import com.flexifit.userticket.UserTicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final UserTicketRepository userTicketRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository, UserTicketRepository userTicketRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.userTicketRepository = userTicketRepository;
    }

    public Ticket createServiceTicket(Ticket serviceTicket) {
        return ticketRepository.save(serviceTicket);
    }

    public List<Ticket> getAllServiceTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> findById(Long id) {
        return ticketRepository.findById(id);
    }

    public Optional<Ticket> updateServiceTicket(Long id, Ticket ticketDetails) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setName(ticketDetails.getName());
            ticket.setDescription(ticketDetails.getDescription());
            ticket.setDurationInDays(ticketDetails.getDurationInDays());
            ticket.setPrice(ticketDetails.getPrice());
            ticket.setImageUrl(ticketDetails.getImageUrl());
            ticket.setAllowedEntries(ticketDetails.getAllowedEntries());
            ticket.setStatus(ticketDetails.getStatus());
            return ticketRepository.save(ticket);
        });
    }

    public boolean deleteServiceTicket(Long id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UserTicket buyServiceTicket(Long ticketId, Long userId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Sprawdzenie, czy użytkownik już posiada aktywny bilet tego samego rodzaju
        boolean hasActiveTicket = userTicketRepository.findByUserIdAndTicketId(userId, ticketId)
                .stream()
                .anyMatch(userTicket -> userTicket.getExpirationDate().isAfter(LocalDateTime.now()));

        if (hasActiveTicket) {
            throw new IllegalArgumentException("User already have an active ticket of this kind");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expirationDate = now.plusDays(ticket.getDurationInDays());

        UserTicket userTicket = UserTicket.builder()
                .user(user)
                .ticket(ticket)
                .purchaseDate(now)
                .expirationDate(expirationDate)
                .build();

        return userTicketRepository.save(userTicket);
    }

    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Plik jest pusty");
        }

        // Walidacja typu pliku
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
            throw new IllegalArgumentException("Dozwolone są tylko pliki JPG i PNG");
        }

        // Generowanie unikalnej nazwy pliku
        String fileName = UUID.randomUUID().toString() + "_" + 
                         file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]", "_");
        
        // Tworzenie ścieżki do zapisu
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Zapis pliku
        Path filePath = uploadPath.resolve(fileName).normalize();
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Zwracanie URL do pliku
        return "/api/v1/tickets/images/" + fileName;
    }
}