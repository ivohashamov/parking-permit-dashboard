package com.interview.parkingpermit.repository;

import com.interview.parkingpermit.domain.ParkingPermit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Extending JpaRepository allows us to use the standard CRUD data operations out of the box
 */
@Repository
public interface ParkingPermitRepository extends JpaRepository<ParkingPermit, Long> {}
